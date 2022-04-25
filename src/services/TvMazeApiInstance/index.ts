export interface URLConfig {
  apiVersion: string
  base: string
  login: string
}

class TvMazeApi {
  base = 'https://api.tvmaze.com'
  getSearchByShow = (show: string) => `${this.base}/search/shows?q=${show}`
  getShowList = (page: number) => `${this.base}/shows?page=${page}`
  getEpisodes = (seasonId: number) => `${this.base}/seasons/${seasonId}/episodes`
  getSeasons = (serieId: number) => `${this.base}/shows/${serieId}/seasons`
  getPeople = (page: number) => `${this.base}/people?page=${page}`
  getSearchByPersonName = (name: string) => `${this.base}/search/people?q=${name}`
  getCast = (personId: number) => `${this.base}/people/${personId}?embed=castcredits`
  getSerie = (serieId: number) => `${this.base}/shows/${serieId}`
}

const TvMazeApiInstance = new TvMazeApi()

export default TvMazeApiInstance