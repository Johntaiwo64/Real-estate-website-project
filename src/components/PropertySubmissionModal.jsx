import { useState } from 'react'
import { company } from '../data'
export default function PropertySubmissionModal({ onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', location: '', type: 'House', message: '' })
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    const message = encodeURIComponent('Hello Salem Real Estate, I would like to list a property. Name: ' + form.name + '. Phone: ' + form.phone + '. Location: ' + form.location + '. Property type: ' + form.type + '. Details: ' + form.message)
    window.open(company.whatsapp + '?text=' + message, '_blank', 'noopener,noreferrer')
    onClose()
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="listing-modal-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close form">×</button>
      <p className="eyebrow">PROPERTY OWNERS</p><h2 id="listing-modal-title">Tell us about your property</h2>
      <p>Submit your details to start a listing conversation with our team.</p>
      <form onSubmit={submit}>
        <label>Your name<input name="name" value={form.name} onChange={update} required /></label>
        <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} required /></label>
        <label>Property location<input name="location" value={form.location} onChange={update} required /></label>
        <label>Property type<select name="type" value={form.type} onChange={update}><option>House</option><option>Apartment</option><option>Villa</option><option>Land</option><option>Commercial</option></select></label>
        <label>Additional details<textarea name="message" rows="3" value={form.message} onChange={update} /></label>
        <button className="search-button" type="submit">Continue to WhatsApp ↗</button>
      </form>
    </section>
  </div>
}
