import { useState } from 'react'
import { company } from '../data'

export default function Header({ savedCount = 0, showSavedOnly, onToggleSaved, onAddProperty, userEmail, onSignIn, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Salem Real Estate home" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="brand-name">Salem <span>Real Estate</span></span>
      </a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen} aria-controls="primary-navigation"><span /><span /><span /></button>
      <nav id="primary-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
        <a href="#search" onClick={closeMenu}>Explore</a>
        <a href="#offers" onClick={closeMenu}>Properties</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#about" onClick={closeMenu}>About us</a>
        <button className={showSavedOnly ? 'saved-nav is-active' : 'saved-nav'} type="button"
          onClick={() => { onToggleSaved?.(); closeMenu() }}>Saved <span>{savedCount}</span></button>
        <button className="header-listing" type="button" onClick={() => { onAddProperty?.(); closeMenu() }}>List your property <span>↗</span></button>
        {userEmail ? <button className="saved-nav" type="button" onClick={() => { onSignOut?.(); closeMenu() }}>Sign out</button> : <button className="saved-nav" type="button" onClick={() => { onSignIn?.(); closeMenu() }}>Sign in</button>}
        <a className="header-action" href={company.whatsapp} target="_blank" rel="noreferrer" onClick={closeMenu}>WhatsApp us <span>↗</span></a>
      </nav>
    </header>
  )
}
