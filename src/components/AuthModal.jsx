import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    if (!supabase) { setError('Add the Supabase project URL and publishable key to the environment settings first.'); return }
    setBusy(true); setError(''); setNotice('')
    try {
      if (mode === 'signup') {
        const { data, error: err } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
        if (err) throw err
        if (data.session) onClose()
        else setNotice('Account created. Check your email to confirm your address, then sign in.')
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
        onClose()
      }
    } catch (err) { setError(err.message || 'Authentication failed.') }
    finally { setBusy(false) }
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
      <p className="eyebrow">SALEM REAL ESTATE</p>
      <h2 id="auth-title">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
      <form onSubmit={submit}>
        {mode === 'signup' && <label>Full name<input value={fullName} onChange={e => setFullName(e.target.value)} required /></label>}
        <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
        <label>Password<input type="password" minLength="8" value={password} onChange={e => setPassword(e.target.value)} required /></label>
        {error && <p role="alert">{error}</p>}
        {notice && <p role="status">{notice}</p>}
        <button className="search-button" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}</button>
      </form>
      <p>{mode === 'signup' ? 'Already registered?' : 'New here?'} <button type="button" onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
    </section>
  </div>
}