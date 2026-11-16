import { useMemo, useState } from 'react'
import Header from './components/Header'
import HeroSearch from './components/HeroSearch'
import ServiceGrid from './components/ServiceGrid'
import { FeatureBand } from './components/FeatureBand'
import CategoryGrid from './components/CategoryGrid'
import OfferSection from './components/OfferSection'
import MortgageCalculator from './components/MortgageCalculator'
import PropertyDetailsModal from './components/PropertyDetailsModal'
import PropertySubmissionModal from './components/PropertySubmissionModal'
import Footer from './components/Footer'
import { offers } from './data'
import './index.css'

const initialFilters = { purpose: 'Buy', location: 'All locations', propertyType: 'Any type', maxPrice: 150000000 }

function App() {
  const [filters, setFilters] = useState(initialFilters)
  const [savedIds, setSavedIds] = useState([])
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showSubmission, setShowSubmission] = useState(false)

  const filteredOffers = useMemo(() => offers.filter((property) => {
    return property.purpose === filters.purpose
      && (filters.location === 'All locations' || property.address === filters.location)
      && (filters.propertyType === 'Any type' || property.propertyType === filters.propertyType)
      && property.priceValue <= filters.maxPrice
      && (!showSavedOnly || savedIds.includes(property.id))
  }), [filters, savedIds, showSavedOnly])

  const updateFilter = (name, value) => setFilters((current) => ({ ...current, [name]: value }))
  const toggleSaved = (id) => setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const clearFilters = () => { setFilters(initialFilters); setShowSavedOnly(false) }

  return (
    <>
      <Header savedCount={savedIds.length} showSavedOnly={showSavedOnly}
        onToggleSaved={() => setShowSavedOnly((current) => !current)}
        onAddProperty={() => setShowSubmission(true)} />
      <main>
        <HeroSearch filters={filters} onFilterChange={updateFilter}
          onSearch={() => { setShowSavedOnly(false); document.querySelector('#offers')?.scrollIntoView({ behavior: 'smooth' }) }}
          onAddProperty={() => setShowSubmission(true)} />
        <ServiceGrid />
        <FeatureBand />
        <CategoryGrid />
        <MortgageCalculator />
        <OfferSection properties={filteredOffers} totalCount={offers.length} savedIds={savedIds}
          showSavedOnly={showSavedOnly} onClearFilters={clearFilters} onToggleSaved={toggleSaved}
          onSelectProperty={setSelectedProperty} onAddProperty={() => setShowSubmission(true)} />
        <Footer />
      </main>
      {selectedProperty && <PropertyDetailsModal property={selectedProperty}
        isSaved={savedIds.includes(selectedProperty.id)}
        onToggleSaved={() => toggleSaved(selectedProperty.id)}
        onClose={() => setSelectedProperty(null)} />}
      {showSubmission && <PropertySubmissionModal onClose={() => setShowSubmission(false)} />}
    </>
  )
}
export default App
