import { figmaAssets } from '../data'
const locations = ['All locations', 'Ijeododo, Lagos', 'Alimosho, Lagos', 'Ojo, Lagos', 'Lagos Mainland']
const types = ['Any type', 'House', 'Apartment', 'Villa']
const formatPrice = (value) => '₦' + Math.round(value / 1000000) + 'm'

export default function HeroSearch({ filters, onFilterChange, onSearch, onAddProperty }) {
  return (
    <section className="hero-section" id="top">
      <img className="hero-image" src={figmaAssets.hero} alt="Contemporary residential property" />
      <div className="hero-copy">
        <p className="eyebrow">SALEM REAL ESTATE</p>
        <h1>Find a perfect home<br /><span>you&apos;ll love</span></h1>
        <p>Thoughtful property guidance for buying, selling,<br />renting and investing across Lagos.</p>
      </div>
      <div className="search-panel" id="search">
        <div className="search-tabs" role="tablist" aria-label="Property purpose">
          {['Buy', 'Rent'].map((purpose) => <button key={purpose} type="button" role="tab"
            aria-selected={filters.purpose === purpose} className={filters.purpose === purpose ? 'is-active' : ''}
            onClick={() => onFilterChange('purpose', purpose)}>{purpose}</button>)}
          <button className="post-property-tab" type="button" onClick={onAddProperty}>List a property <span>↗</span></button>
        </div>
        <div className="search-fields">
          <label className="search-select-label"><span className="field-icon location-icon" aria-hidden="true" />
            <span className="sr-only">Location</span>
            <select value={filters.location} onChange={(e) => onFilterChange('location', e.target.value)}>
              {locations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="search-select-label"><span className="field-icon home-icon" aria-hidden="true" />
            <span className="sr-only">Property type</span>
            <select value={filters.propertyType} onChange={(e) => onFilterChange('propertyType', e.target.value)}>
              {types.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="price-field"><span>Maximum price</span>
            <input type="range" min="12000000" max="150000000" step="1000000" value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))} />
            <strong>{formatPrice(filters.maxPrice)}</strong>
          </label>
          <div className="search-tools"><button className="search-button" type="button" onClick={onSearch}>
            <span className="search-icon" aria-hidden="true" /> <span>Search homes</span></button></div>
        </div>
      </div>
      <a className="hero-enquiry" href="https://wa.me/2347067795770" target="_blank" rel="noreferrer">Speak to our team <span>↗</span></a>
      <div className="hero-dots" aria-hidden="true"><span className="active" /><span /><span /></div>
    </section>
  )
}
