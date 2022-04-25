import Country from "models/Country"

interface Network {
  id: number
  name: string
  country: Country
  officialSite: string
} 

export default Network