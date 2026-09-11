import { company } from '../data'

export default function Footer() {
  return <footer className="site-footer" id="contact"><div><a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /></span><span className="brand-name">Salem <span>Real Estate</span></span></a><p>Trusted property guidance, from search to keys.</p></div><div className="footer-links"><div><h3>Explore</h3><a href="#properties">Properties</a><a href="#offers">Featured listings</a><a href="#services">Our services</a></div><div><h3>Get in touch</h3><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp: {company.phone}</a><span>{company.address}</span></div></div></footer>
}
