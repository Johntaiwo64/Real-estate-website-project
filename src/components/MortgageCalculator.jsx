import { useMemo, useState } from 'react'
const money = (value) => '₦' + Math.round(value).toLocaleString('en-NG')
export default function MortgageCalculator() {
  const [price, setPrice] = useState(50000000)
  const [deposit, setDeposit] = useState(20)
  const [rate, setRate] = useState(18)
  const [years, setYears] = useState(15)
  const monthly = useMemo(() => {
    const principal = price * (1 - deposit / 100)
    const months = years * 12
    const monthlyRate = rate / 100 / 12
    if (!monthlyRate) return principal / months
    return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months))
  }, [price, deposit, rate, years])
  return <section className="mortgage-section section-shell" id="calculator">
    <div><p className="eyebrow">PLAN YOUR PURCHASE</p><h2 className="section-title">Estimate your monthly mortgage</h2>
      <p className="mortgage-intro">Adjust the figures to get an indicative monthly repayment estimate.</p></div>
    <div className="mortgage-card">
      <div className="mortgage-fields">
        <label>Property price <strong>{money(price)}</strong><input type="range" min="12000000" max="150000000" step="1000000" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
        <label>Deposit <strong>{deposit}%</strong><input type="range" min="5" max="80" step="5" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} /></label>
        <label>Annual interest rate <strong>{rate}%</strong><input type="range" min="1" max="35" step=".5" value={rate} onChange={(e) => setRate(Number(e.target.value))} /></label>
        <label>Loan term <strong>{years} years</strong><input type="range" min="1" max="30" value={years} onChange={(e) => setYears(Number(e.target.value))} /></label>
      </div>
      <div className="mortgage-result"><span>Estimated monthly repayment</span><strong>{money(monthly)}</strong>
        <p>Loan amount: {money(price * (1 - deposit / 100))}</p><small>Illustrative estimate only. Actual rates, fees, eligibility and lender terms may differ.</small></div>
    </div>
  </section>
}
