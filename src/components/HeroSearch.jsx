import { useState } from 'react'
import { company, figmaAssets } from '../data'

const tabs = ['Buy', 'Rent', 'Projects', 'Commercial', 'New Launch', 'Post Free Property Ad']

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState('Buy')
  const [location, setLocation] = useState('Location')

  return (
    <section className="hero-section" id="top">
      <img className="hero-image" src={figmaAssets.hero} alt="Contemporary apartment building" />
      <div className="hero-copy">
        <p className="eyebrow">SALEM REAL ESTATE</p>
        <h1>Find a perfect home<br /><span>you&apos;ll love</span></h1>
        <p>Trusted property guidance for buying, selling,<br />renting and investing across Lagos.</p>
      </div>
      <div className="search-panel" id="search">
        <div className="search-tabs" role="tablist" aria-label="Property intent">
          {tabs.map((tab) => <button key={tab} className={activeTab === tab ? 'is-active' : ''} type="button" onClick={() => setActiveTab(tab)}>{tab}{tab === 'New Launch' && <b>NEW</b>}</button>)}
        </div>
        <div className="search-fields">
          <button className="select-field" type="button" onClick={() => setLocation(location === 'Location' ? 'Ijeododo, Lagos' : 'Location')}><span className="field-icon location-icon" aria-hidden="true" />{location}<span className="chevron" aria-hidden="true" /></button>
          <button className="select-field" type="button"><span className="field-icon home-icon" aria-hidden="true" />Property Type<span className="chevron" aria-hidden="true" /></button>
          <label className="price-field"><span>Price</span><input type="range" min="12000000" max="150000000" defaultValue="42000000" /><strong>₦12m+</strong></label>
          <div className="search-tools"><button className="tool-icon voice-icon" type="button" aria-label="Voice search" /><button className="tool-icon nearby-icon" type="button" aria-label="Nearby search" /><button className="search-button" type="button" onClick={() => document.querySelector('#offers')?.scrollIntoView({ behavior: 'smooth' })}><span className="search-icon" aria-hidden="true" /> <span>View Properties</span></button></div>
        </div>
      </div>
      <a className="hero-enquiry" href={company.whatsapp} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a>
      <div className="hero-dots" aria-label="Hero slides"><span className="active" /><span /><span /></div>
    </section>
  )
}
