import { company } from '../data'
function PropertyCard({ property, isSaved, onToggleSaved, onSelectProperty }) {
  const message = encodeURIComponent('Hello Salem Real Estate, I am interested in ' + property.title + ' at ' + property.price + ' in ' + property.address + '.')
  return <article className="offer-card">
    <div className="offer-image"><img src={property.image} alt={property.title} loading="lazy" />
      <span>{property.purpose === 'Rent' ? 'For Rent' : 'For Sale'}</span>
      <button className={isSaved ? 'favorite-button is-saved' : 'favorite-button'} type="button"
        onClick={() => onToggleSaved(property.id)} aria-pressed={isSaved}
        aria-label={isSaved ? 'Remove from saved properties' : 'Save property'}>{isSaved ? '♥' : '♡'}</button>
    </div>
    <div className="offer-content"><div className="property-type-label">{property.propertyType}</div>
      <h3>{property.title}</h3><p className="offer-location">⌖ {property.address}</p><strong>{property.price}</strong>
      <div className="facilities"><span>⌂ {property.beds} beds</span><span>▱ {property.baths} baths</span><span>▣ {property.parking} parking</span></div>
      <button className="details-button" type="button" onClick={() => onSelectProperty(property)}>View details <span>↗</span></button>
      <a className="enquiry-link" href={company.whatsapp + '?text=' + message} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a>
    </div>
  </article>
}
export default function OfferSection({ properties, totalCount, savedIds, showSavedOnly, onClearFilters, onToggleSaved, onSelectProperty, onAddProperty }) {
  return <section className="offers-section section-shell" id="offers">
    <div className="section-heading-row"><div><p className="eyebrow">{showSavedOnly ? 'YOUR SHORTLIST' : 'FEATURED LISTINGS'}</p>
      <h2 className="section-title">{showSavedOnly ? 'Properties you have saved' : 'Homes selected for your next move'}</h2>
      <p className="results-count" aria-live="polite">Showing {properties.length} of {totalCount} sample listings</p></div>
      {(showSavedOnly || properties.length !== totalCount) && <button className="clear-filters" type="button" onClick={onClearFilters}>Clear filters</button>}
    </div>
    {properties.length ? <div className="offer-grid">{properties.map((property) => <PropertyCard key={property.id} property={property}
      isSaved={savedIds.includes(property.id)} onToggleSaved={onToggleSaved} onSelectProperty={onSelectProperty} />)}</div>
      : <div className="empty-state"><span className="empty-state-icon">⌂</span>
        <h3>{showSavedOnly ? 'No saved properties yet' : 'No matching properties found'}</h3>
        <p>{showSavedOnly ? 'Tap the heart on a listing to add it to your shortlist.' : 'Try another location, property type or maximum price. The demo currently contains purchase listings only.'}</p>
        <div className="empty-state-actions"><button className="search-button" type="button" onClick={onClearFilters}>Reset filters</button>
          <button className="outline-button" type="button" onClick={onAddProperty}>List a property</button></div></div>}
  </section>
}
