import { useState } from 'react'
import { company } from '../data'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Realty home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">Salem <span>Real Estate</span></span>
      </a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
        <a href="#properties" onClick={() => setMenuOpen(false)}>Buy</a>
        <a href="#offers" onClick={() => setMenuOpen(false)}>Rent</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a className="header-action" href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a>
      </nav>
    </header>
  )
}
