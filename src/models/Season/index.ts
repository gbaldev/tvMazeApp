import { Image, Links, Network, WebChannel } from 'models/index'

interface Season {
  id: number
  url: string
  number: number
  name: string
  episodeOrder: number
  premiereDate: string
  endDate: string
  network: Network,
  webChannel: WebChannel
  image: Image
  summary: string
  _links: Links
}

export default Season
