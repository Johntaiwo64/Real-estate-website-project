import { useState } from 'react'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function PropertySubmissionModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: '', price: '', purpose: 'Buy', name: '', phone: '', location: '', type: 'House', bedrooms: '0', bathrooms: '0', message: '', images: [] })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const update = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  function updateImages(event) {
    const files = Array.from(event.target.files || [])
    if (files.length > 5) { setError('You can upload up to 5 images.'); event.target.value = ''; return }
    const invalid = files.find(file => !ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES)
    if (invalid) { setError('Use JPG, PNG or WebP images, each no larger than 5 MB.'); event.target.value = ''; return }
    setError('')
    setForm(current => ({ ...current, images: files }))
  }
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('')
    try { await onSubmit(form) }
    catch (err) { setError(err.message || 'Unable to submit this property. Please try again.') }
    finally { setBusy(false) }
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="listing-modal-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close form">×</button>
      <p className="eyebrow">PROPERTY OWNERS</p><h2 id="listing-modal-title">Submit your property</h2>
      <p>Your listing will be reviewed by the Salem Real Estate team before publication.</p>
      <form onSubmit={submit}>
        <label>Property title<input name="title" value={form.title} onChange={update} minLength="5" maxLength="140" required /></label>
        <label>Asking price (NGN)<input name="price" type="number" min="1" step="0.01" value={form.price} onChange={update} required /></label>
        <label>Listing purpose<select name="purpose" value={form.purpose} onChange={update}><option>Buy</option><option>Rent</option></select></label>
        <label>Property location<input name="location" value={form.location} onChange={update} required /></label>
        <label>Property type<select name="type" value={form.type} onChange={update}><option>House</option><option>Apartment</option><option>Villa</option><option>Land</option><option>Commercial</option></select></label>
        <label>Bedrooms<input name="bedrooms" type="number" min="0" value={form.bedrooms} onChange={update} /></label>
        <label>Bathrooms<input name="bathrooms" type="number" min="0" value={form.bathrooms} onChange={update} /></label>
        <label>Property photos (up to 5, JPG/PNG/WebP, max 5 MB each)<input name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={updateImages} /></label>
        {form.images.length > 0 && <p>{form.images.length} image{form.images.length === 1 ? '' : 's'} selected</p>}
        <label>Details<textarea name="message" rows="3" value={form.message} onChange={update} /></label>
        {error && <p role="alert">{error}</p>}
        <button className="search-button" type="submit" disabled={busy}>{busy ? 'Submitting…' : 'Submit for review'}</button>
      </form>
    </section>
  </div>
}
