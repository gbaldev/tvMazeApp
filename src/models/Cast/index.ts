interface Cast {
  self: boolean
  voice: boolean
  _links: {
    show: {
      href: string
    },
    character: {
      href: string
    }
  }
}

export default Cast