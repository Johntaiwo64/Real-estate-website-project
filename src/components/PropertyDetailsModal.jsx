import { useEffect } from 'react'
import { company } from '../data'
export default function PropertyDetailsModal({ property, isSaved, onToggleSaved, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  const message = encodeURIComponent('Hello Salem Real Estate, please tell me more about ' + property.title + ' in ' + property.address + '.')
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
    <section className="property-modal" role="dialog" aria-modal="true" aria-labelledby="property-modal-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close details">×</button>
      <img src={property.image} alt={property.title} />
      <div className="property-modal-content"><p className="eyebrow">{property.propertyType} · {property.purpose}</p>
        <h2 id="property-modal-title">{property.title}</h2><strong className="modal-price">{property.price}</strong>
        <p>{property.description}</p><p>⌖ {property.address}</p>
        <div className="facilities"><span>{property.beds} bedrooms</span><span>{property.baths} bathrooms</span><span>{property.parking} parking spaces</span></div>
        <div className="modal-actions"><button className="outline-button" type="button" onClick={onToggleSaved}>{isSaved ? '♥ Saved' : '♡ Save property'}</button>
          <a className="search-button" href={company.whatsapp + '?text=' + message} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></div>
      </div>
    </section>
  </div>
}
