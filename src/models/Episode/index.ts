import Image from "../Image"
import Links from "../Links"
import Rating from "../Rating"

interface Episode {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: string
  airtime: string
  airstamp: string
  runtime: number
  rating: Rating
  image: Image
  summary: string
  _links: Links
}

export interface EpisodeBySerieIdResponse {
  episodes: Episode[]
  serieId: number
}

export default Episode
