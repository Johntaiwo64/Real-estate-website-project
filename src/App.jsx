import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import HeroSearch from './components/HeroSearch'
import ServiceGrid from './components/ServiceGrid'
import { FeatureBand } from './components/FeatureBand'
import CategoryGrid from './components/CategoryGrid'
import OfferSection from './components/OfferSection'
import MortgageCalculator from './components/MortgageCalculator'
import PropertyDetailsModal from './components/PropertyDetailsModal'
import PropertySubmissionModal from './components/PropertySubmissionModal'
import AuthModal from './components/AuthModal'
import Footer from './components/Footer'
import { offers } from './data'
import { isSupabaseConfigured, supabase } from './lib/supabase'
import './index.css'

const initialFilters = { purpose: 'Buy', location: 'All locations', propertyType: 'Any type', maxPrice: 150000000 }
const mapProperty = (row) => ({
  id: row.id, title: row.title, price: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(row.price),
  priceValue: Number(row.price), address: row.address, image: row.image_urls?.[0] || '', beds: row.bedrooms,
  baths: row.bathrooms, parking: row.parking_spaces, propertyType: row.property_type, purpose: row.purpose,
  description: row.description || '', status: row.status,
})

function App() {
  const [filters, setFilters] = useState(initialFilters)
  const [savedIds, setSavedIds] = useState(() => {
    try { const value = JSON.parse(window.localStorage.getItem('salem-saved-properties') || '[]'); return Array.isArray(value) ? value : [] }
    catch { return [] }
  })
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showSubmission, setShowSubmission] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [session, setSession] = useState(null)
  const [properties, setProperties] = useState(offers)
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [backendMessage, setBackendMessage] = useState('')

  useEffect(() => {
    if (!supabase) return
    let alive = true
    supabase.auth.getSession().then(({ data }) => { if (alive) setSession(data.session) })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      if (!nextSession) setSavedIds(current => current.filter(id => id.startsWith('demo-')))
    })
    return () => { alive = false; listener.subscription.unsubscribe() }
  }, [])

  useEffect(() => {
    if (!supabase) return
    let alive = true
    setLoadingProperties(true)
    supabase.from('properties').select('*').eq('status', 'active').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return
        if (error) setBackendMessage('Live listings are unavailable. Showing sample properties until the database is ready.')
        else if (data?.length) setProperties(data.map(mapProperty))
        setLoadingProperties(false)
      })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    if (!supabase || !session?.user?.id) {
      window.localStorage.setItem('salem-saved-properties', JSON.stringify(savedIds))
      return
    }
    let alive = true
    supabase.from('favorites').select('property_id').eq('user_id', session.user.id)
      .then(({ data, error }) => { if (alive && !error && data) setSavedIds(data.map(item => item.property_id)) })
    return () => { alive = false }
  }, [session?.user?.id])

  const filteredOffers = useMemo(() => properties.filter(property =>
    property.purpose === filters.purpose
    && (filters.location === 'All locations' || property.address === filters.location)
    && (filters.propertyType === 'Any type' || property.propertyType === filters.propertyType)
    && property.priceValue <= filters.maxPrice
    && (!showSavedOnly || savedIds.includes(property.id))
  ), [filters, properties, savedIds, showSavedOnly])

  const updateFilter = (name, value) => setFilters(current => ({ ...current, [name]: value }))
  const toggleSaved = async (id) => {
    const exists = savedIds.includes(id)
    setSavedIds(current => exists ? current.filter(item => item !== id) : [...current, id])
    if (supabase && session?.user?.id && !String(id).startsWith('demo-')) {
      const result = exists
        ? await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('property_id', id)
        : await supabase.from('favorites').insert({ user_id: session.user.id, property_id: id })
      if (result.error) setBackendMessage('Could not sync your saved property. Please sign in again and retry.')
    }
  }
  const clearFilters = () => { setFilters(initialFilters); setShowSavedOnly(false) }

  const submitProperty = async (form) => {
    if (!supabase || !session?.user?.id) { setShowSubmission(false); setShowAuth(true); return }
    const { error } = await supabase.from('properties').insert({
      owner_id: session.user.id, title: form.title, description: form.message || '',
      purpose: form.purpose, property_type: form.type, price: Number(form.price),
      address: form.location, bedrooms: Number(form.bedrooms || 0), bathrooms: Number(form.bathrooms || 0),
      status: 'pending',
    })
    if (error) throw error
    setShowSubmission(false)
    setBackendMessage('Your property has been submitted for admin review.')
  }

  const signOut = async () => { if (supabase) await supabase.auth.signOut(); setShowSavedOnly(false) }

  return <>
    <Header savedCount={savedIds.length} showSavedOnly={showSavedOnly}
      onToggleSaved={() => setShowSavedOnly(current => !current)}
      onAddProperty={() => session ? setShowSubmission(true) : setShowAuth(true)}
      userEmail={session?.user?.email} onSignIn={() => setShowAuth(true)} onSignOut={signOut} />
    <main>
      <HeroSearch filters={filters} onFilterChange={updateFilter}
        onSearch={() => { setShowSavedOnly(false); document.querySelector('#offers')?.scrollIntoView({ behavior: 'smooth' }) }}
        onAddProperty={() => session ? setShowSubmission(true) : setShowAuth(true)} />
      {backendMessage && <p className="backend-notice" role="status">{backendMessage}</p>}
      {isSupabaseConfigured && loadingProperties && <p className="backend-notice">Loading live property listings…</p>}
      <ServiceGrid /><FeatureBand /><CategoryGrid /><MortgageCalculator />
      <OfferSection properties={filteredOffers} totalCount={properties.length} savedIds={savedIds}
        showSavedOnly={showSavedOnly} onClearFilters={clearFilters} onToggleSaved={toggleSaved}
        onSelectProperty={setSelectedProperty}
        onAddProperty={() => session ? setShowSubmission(true) : setShowAuth(true)} />
      <Footer />
    </main>
    {selectedProperty && <PropertyDetailsModal property={selectedProperty}
      isSaved={savedIds.includes(selectedProperty.id)} onToggleSaved={() => toggleSaved(selectedProperty.id)}
      onClose={() => setSelectedProperty(null)} />}
    {showSubmission && <PropertySubmissionModal onClose={() => setShowSubmission(false)} onSubmit={submitProperty} />}
    {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
  </>
}
export default App
