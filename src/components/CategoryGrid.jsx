import { categories, company } from '../data'

export default function CategoryGrid() {
  return <section className="category-section section-shell" id="properties"><p className="eyebrow">EXPLORE OUR COLLECTION</p><h2 className="section-title">A considered place for every kind of property search</h2><div className="category-grid">{categories.map((category) => <article className="category-card" key={category.label}><img src={category.image} alt={category.label} /><div><strong>{category.count}</strong><h3>{category.label}</h3><p>{category.price} · {category.location}</p><a href={`${company.whatsapp}?text=${encodeURIComponent(`Hello Salem Real Estate, I would like to enquire about ${category.label}.`)}`} target="_blank" rel="noreferrer">Enquire <span>↗</span></a></div></article>)}</div></section>
}
