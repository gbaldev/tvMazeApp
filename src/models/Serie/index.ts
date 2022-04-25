import { Externals, Image, Links, Network, Rating, Schedule, Season, WebChannel } from "../"
import Episode from "../Episode"

interface Serie {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: string
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string
  officialSite: string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network
  webChannel: WebChannel | null
  dvdCountry: string | null
  externals: Externals
  image: Image
  summary: string
  updated: number
  _links: Links
  isFavorite: boolean
  seasons: { [seasonNumber: number]: Episode[] }
  loadingEpisodes: boolean
  episodesError: boolean
}

export default Serie
