import { CHANNEL } from "models/Channel"

interface WebChannel {
    id: number
    name: CHANNEL
    country: {
      name: string
      code: string
      timezone: string
    },
    officialSite: string
}

export default WebChannel
