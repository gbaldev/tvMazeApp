import { PayloadAction } from "@reduxjs/toolkit"
import { GeneralTvMazeState } from "../"
import { People, PeopleWithCast, SearchByShowResponse, Serie } from "../../../models"
import { EpisodeBySerieIdResponse } from "../../../models/Episode"
import { SearchByNameResponse } from "../../../models/SearchedSerie"
import { removeHtmlTags } from "../../../utils/utils"

const fetchSeriesListReducer = {
  pending: (state: GeneralTvMazeState) => {
      state.loading = true
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<Serie[]>) => {
      state.loading = false
      let fetchedSeriesList = action.payload
      let newSeries: { [id: string]: Serie} = {}
      for (let serie of fetchedSeriesList) {
        serie.summary = removeHtmlTags(serie?.summary || '')
        serie.isFavorite = false
        serie.loadingEpisodes = false
        serie.episodesError = false
        serie.seasons = {}
        newSeries[serie.id] = serie
      }
      state.series = {...state.series, ...newSeries}
      state.actualPage = state.actualPage + 1
  },
  rejected: (state: GeneralTvMazeState) => {
      state.loading = false
  },
}

const fetchSerieByNameReducer = {
  pending: (state: GeneralTvMazeState) => {
      state.loading = true
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<SearchByShowResponse>) => {
      state.loading = false
      let newSeries: {[id: string]: Serie} = {}
      let fetchedSeriesList = action.payload.series.map(s => {
        let serie = { ...(s.show), summary: removeHtmlTags(s?.show?.summary || ''), isFavorite: false, loadingEpisodes: false, episodesError: false }
        newSeries[serie.id] = serie
        return serie
      })
      state.series = {...state.series, ...newSeries}
      state.searchResults.serieLastResults = fetchedSeriesList.map(s => s.id)
      state.searchResults.serieLastSearch = action.payload.searchedValue
  },
  rejected: (state: GeneralTvMazeState) => {
      state.loading = false
  },
}

const fetchEpisodesReducer = {
  pending: (state: GeneralTvMazeState, action: any) => {
    state.series[action.meta.arg.serieId] = { ...state.series[action.meta.arg.serieId], loadingEpisodes: true, episodesError: false }
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<EpisodeBySerieIdResponse>) => {
    state.series[action.payload.serieId] = { ...state.series[action.payload.serieId], loadingEpisodes: false }
    try {
      for (let episode of action.payload.episodes) {
        state.series[action.payload.serieId].seasons[episode.season] = [
          ...(state.series[action.payload.serieId]?.seasons[episode.season] || []),
          episode
        ]
      }
    } catch (e) {
      state.series[action.payload.serieId] = { ...state.series[action.payload.serieId], loadingEpisodes: false, episodesError: true }
    }
  },
  rejected: (state: GeneralTvMazeState, action: any) => {
    state.series[action?.meta?.arg?.serieId] = { ...state.series[action?.meta?.arg?.serieId], loadingEpisodes: false, episodesError: true }
    state.loading = false
  },
}

const fetchPeopleReducer = {
  pending: (state: GeneralTvMazeState) => {
    state.loading = false
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<People[]>) => {
      state.loading = false
      let fetchedPeopleList = action.payload
      let newPeople: { [id: string]: People} = {}
      for (let person of fetchedPeopleList) {
        person.loadingCast = false
        person.castIds = null
        newPeople[person.id] = person
      }
      state.people = {...state.people, ...newPeople}
      state.actualPersonsPage = state.actualPersonsPage + 1
  },
  rejected: (state: GeneralTvMazeState) => {
    state.loading = false
  },
}

const fetchPersonsByNameReducer = {
  pending: (state: GeneralTvMazeState) => {
      state.loading = true
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<SearchByNameResponse>) => {
      state.loading = false
      let newPeople: {[id: string]: People} = {}
      let fetchedPeopleList = action.payload.persons.map(p => {
        let person = { ...(p.person)}
        person.loadingCast = false
        person.castIds = null
        newPeople[person.id] = person
        return person
      })
      state.people = {...state.people, ...newPeople}
      state.searchResults.personsLastResults = fetchedPeopleList.map(p => p.id)
      state.searchResults.personsLastSearch = action.payload.searchedValue
  },
  rejected: (state: GeneralTvMazeState) => {
      state.loading = false
  },
}

const getShowIdFromCastLink = (link: string) => {
  console.log(link)
  const splitted = link.split('/')
  return splitted.length ? Number(splitted[splitted.length - 1]) : 0
}

const fetchCastReducer = {
  pending: (state: GeneralTvMazeState, action: any) => {
    state.people[action.meta.arg.personId] = { ...state.people[action.meta.arg.personId], loadingCast: true}
  },
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<PeopleWithCast>) => {
    state.people[action.payload.id] = { ...state.people[action.payload.id], loadingCast: false }
    try {
      let showsIdLists = action.payload._embedded.castcredits.map(cast => getShowIdFromCastLink(cast._links?.show?.href))
      state.people[action.payload.id].castIds = showsIdLists
    } catch (e) {
      state.people[action.payload.id] = { ...state.people[action.payload.id], loadingCast: false }
    }
  },
  rejected: (state: GeneralTvMazeState, action: any) => {
    state.people[action?.meta?.arg?.personId] = { ...state.people[action?.meta?.arg?.personId], loadingCast: false }
    state.loading = false
  },
}

const fetchSerieByIdReducer = {
  pending: (_: GeneralTvMazeState) => {},
  fulfilled: (state: GeneralTvMazeState, action: PayloadAction<Serie>) => {
      let newSeries = { ...state.series }
      let serie = { ...action?.payload, summary: removeHtmlTags(action?.payload?.summary || ''), isFavorite: false, loadingEpisodes: false, episodesError: false }
      newSeries[action.payload.id] = serie
      state.series = newSeries
  },
  rejected: (_: GeneralTvMazeState) => {},
}

export { fetchSeriesListReducer, fetchSerieByNameReducer, fetchEpisodesReducer, fetchPeopleReducer, fetchPersonsByNameReducer, fetchCastReducer, fetchSerieByIdReducer }
