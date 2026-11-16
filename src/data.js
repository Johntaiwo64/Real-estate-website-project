export const figmaAssets = {
  hero: 'https://www.figma.com/api/mcp/asset/6e4af432-c78e-4610-8f21-c0b137944253.png',
  owner: 'https://www.figma.com/api/mcp/asset/e546465c-7419-4e84-bb25-e901469df6cc.png',
  projects: 'https://www.figma.com/api/mcp/asset/fe5fc96a-f432-47f0-87bc-9dc026fe92c9.png',
  moveIn: 'https://www.figma.com/api/mcp/asset/ee96d979-2f40-4818-818d-4836e5387977.png',
  budget: 'https://www.figma.com/api/mcp/asset/640b6e02-1279-486a-a9ee-2aa7af139b66.png',
  offerOne: 'https://www.figma.com/api/mcp/asset/98c90929-44bc-473e-aa68-8e9b184c9433.png',
  offerTwo: 'https://www.figma.com/api/mcp/asset/c9f2770a-80ba-43e0-b6ed-a7c536d88946.png',
  offerThree: 'https://www.figma.com/api/mcp/asset/51e9cd0d-64cb-4786-8bd2-1ddfb0bcefac.png',
  offerFour: 'https://www.figma.com/api/mcp/asset/001ef37b-ff2e-4298-9a22-6145aa9913e5.png',
  illustration: 'https://www.figma.com/api/mcp/asset/59f44059-53af-4852-9e51-b3269dafef0e.svg',
}
export const company = { name: 'Salem Real Estate', email: 'Salemrealestate@gmail.com', phone: '07067795770', whatsapp: 'https://wa.me/2347067795770', address: 'Plot 6, Trinity Road, Agaye Junction, Ijeododo, Lagos' }
export const serviceData = [
  { title: 'Home Loans', text: 'Understand financing options and plan your next property purchase.', icon: '⌂' },
  { title: 'Investment Hotspots', text: 'Explore selected Lagos locations and property opportunities.', icon: '⌖' },
  { title: 'Research Insights', text: 'Get practical guidance to help you ask better property questions.', icon: '▥' },
  { title: 'Rates & Trends', text: 'Compare asking prices across the sample property listings.', icon: '↗' },
]
export const categories = [
  { label: 'Owner Properties', count: '24 available', price: 'From ₦18m', location: 'Ijeododo, Lagos', image: figmaAssets.owner },
  { label: 'Realty Projects', count: '8 developments', price: 'From ₦35m', location: 'Lagos Mainland', image: figmaAssets.projects },
  { label: 'Ready to Move-in', count: '16 homes', price: 'From ₦25m', location: 'Alimosho, Lagos', image: figmaAssets.moveIn },
  { label: 'Budget Homes', count: '12 available', price: 'From ₦12m', location: 'Ojo, Lagos', image: figmaAssets.budget },
]
export const offers = [
  { id: 'family-home-120', title: 'Family Home | 120 sq.m', price: '₦42m', priceValue: 42000000, address: 'Ijeododo, Lagos', image: figmaAssets.offerOne, beds: 3, baths: 2, parking: 2, propertyType: 'House', purpose: 'Buy', description: 'A three-bedroom family home listing in Ijeododo, Lagos.' },
  { id: 'apartment-200', title: '3 Bedroom Apartment | 200 sq.m', price: '₦58m', priceValue: 58000000, address: 'Alimosho, Lagos', image: figmaAssets.offerTwo, beds: 3, baths: 2, parking: 2, propertyType: 'Apartment', purpose: 'Buy', description: 'A three-bedroom apartment listing in Alimosho, Lagos.' },
  { id: 'apartment-240', title: '4 Bedroom Apartment | 240 sq.m', price: '₦75m', priceValue: 75000000, address: 'Ojo, Lagos', image: figmaAssets.offerThree, beds: 4, baths: 3, parking: 2, propertyType: 'Apartment', purpose: 'Buy', description: 'A four-bedroom apartment listing in Ojo, Lagos.' },
  { id: 'modern-villa-280', title: 'Modern Villa | 280 sq.m', price: '₦110m', priceValue: 110000000, address: 'Lagos Mainland', image: figmaAssets.offerFour, beds: 4, baths: 3, parking: 2, propertyType: 'Villa', purpose: 'Buy', description: 'A four-bedroom villa listing on the Lagos Mainland.' },
]
