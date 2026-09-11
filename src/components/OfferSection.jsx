import { useState } from 'react'
import { company, offers } from '../data'

export default function OfferSection() {
  const [offset, setOffset] = useState(0)
  const visibleOffers = offers.slice(offset).concat(offers.slice(0, offset))
  return <section className="offers-section section-shell" id="offers"><div className="section-heading-row"><div><p className="eyebrow">FEATURED LISTINGS</p><h2 className="section-title">Homes selected for your next move</h2></div><div className="carousel-controls"><button type="button" onClick={() => setOffset((offset + offers.length - 1) % offers.length)} aria-label="Previous offers">←</button><button type="button" onClick={() => setOffset((offset + 1) % offers.length)} aria-label="Next offers">→</button></div></div><div className="offer-grid">{visibleOffers.map((offer) => <article className="offer-card" key={offer.title}><div className="offer-image"><img src={offer.image} alt={offer.title} /><span>For Sale</span></div><div className="offer-content"><h3>{offer.title}</h3><p className="offer-location">⌖ {offer.address}</p><strong>{offer.price}</strong><div className="facilities"><span>⌂ {offer.beds} beds</span><span>▱ {offer.baths} baths</span><span>▣ {offer.parking} parking</span></div><a className="enquiry-link" href={`${company.whatsapp}?text=${encodeURIComponent(`Hello Salem Real Estate, I am interested in the ${offer.title} listed at ${offer.price}.` )}`} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div></article>)}</div></section>
}
