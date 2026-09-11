import { serviceData } from '../data'

export default function ServiceGrid() {
  return (
    <section className="services section-shell" id="services">
      <h2 className="section-title">Explore property related services</h2>
      <div className="service-grid">
        {serviceData.map((service) => <article className="service-card" key={service.title}><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p></article>)}
      </div>
      <button className="owner-banner" type="button" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}><strong>Are your property owner?</strong> Sell/Rent for FREE <span>✦</span></button>
    </section>
  )
}
