import { Cast, Country, Image } from "../"
import Links from "../Links"

interface People {
  id: number
  url: string
  name: string
  country: Country
  birthday: string
  deathday: string
  gender: string
  image: Image,
  updated: number
  _links: Links
  loadingCast: boolean
  castIds: number[] | null
}

export interface PeopleWithCast extends People {
  _embedded: {
    castcredits: Cast[]
  }
}

export default People