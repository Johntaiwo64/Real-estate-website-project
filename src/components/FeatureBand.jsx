export function FeatureBand({ calculator = false }) {
  return (
    <section className={calculator ? 'feature-band calculator-band' : 'feature-band'} id={calculator ? 'calculator' : 'about'}>
      <div className="feature-inner">
        <div className="feature-illustration"><div className={calculator ? 'illustration-art calculator-art' : 'illustration-art'}><span>{calculator ? '▦' : '⌂'}</span><i /><i /><i /></div></div>
        <div className="feature-copy">
          <p className="eyebrow">{calculator ? 'SMART PROPERTY TOOLS' : 'WHY CHOOSE US'}</p>
          <h2>{calculator ? 'Calculate the cost of your property' : 'We are the best in the housing market'}</h2>
          {calculator ? <p>Real estate appraisal helps you understand the average market value of an apartment, house, or land. Calculate your property cost with our new calculation service.</p> : <ul><li>We are the leading authority in the housing market.</li><li>When it comes to real estate, we are simply the best.</li><li>Our expertise and results make us the top choice locally.</li><li>We stand out as the premier residential real estate provider.</li><li>For unparalleled service and results, choose us.</li></ul>}
          <button className="outline-button" type="button">{calculator ? 'Calculate now' : 'Add Property'} <span>↗</span></button>
        </div>
      </div>
    </section>
  )
}
