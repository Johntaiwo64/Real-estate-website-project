import Header from './components/Header'
import HeroSearch from './components/HeroSearch'
import ServiceGrid from './components/ServiceGrid'
import { FeatureBand } from './components/FeatureBand'
import CategoryGrid from './components/CategoryGrid'
import OfferSection from './components/OfferSection'
import Footer from './components/Footer'
import './index.css'

function App() {
  return <><Header /><main><HeroSearch /><ServiceGrid /><FeatureBand /><CategoryGrid /><FeatureBand calculator /><OfferSection /><Footer /></main></>
}

export default App
