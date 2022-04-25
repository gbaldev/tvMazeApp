import { createAsyncThunk } from '@reduxjs/toolkit'
import { SearchedSerie, SearchedPerson } from 'models/index'
import Episode, { EpisodeBySerieIdResponse } from 'models/Episode'
import TvMazeService from 'services/TvMazeService'

interface SeriesListProps {
  page?: number
}
interface SeriesByNameProps {
  name: string
}
interface EpisodesBySerieId {
  serieId: number
}
interface PeopleListProps {
  page?: number
}
interface CastProps {
  personId: number
}
interface SerieByIdProps {
  serieId: number
}

export const fetchSeriesList = createAsyncThunk('generalTvMaze/seriesList', async ({ page = 0 }: SeriesListProps ) => {
  return TvMazeService.getSeriesList(page)
})

export const fetchSerieByName = createAsyncThunk('generalTvMaze/serieByName', async ({ name }: SeriesByNameProps ) => {
  return { series: await TvMazeService.getShowByName(name), searchedValue: name } as unknown as  SearchedSerie
})

export const fetchPersonsByName = createAsyncThunk('generalTvMaze/personByName', async ({ name }: SeriesByNameProps ) => {
  return { persons: await TvMazeService.getPersonsByName(name), searchedValue: name } as unknown as  SearchedPerson
})

export const fetchEpisodes = createAsyncThunk('generalTvMaze/episodes', async ({ serieId }: EpisodesBySerieId) => {
  let seasons = await TvMazeService.getSeasonsBySerieId(serieId)
  let totalEpisodes: Episode[] = []
  for (let season of seasons) {
    let partialEpisodes = await TvMazeService.getEpisodesBySeasonId(season.id)
    totalEpisodes = [...totalEpisodes, ...partialEpisodes]
  }
  return { episodes: totalEpisodes, serieId } as unknown as EpisodeBySerieIdResponse
})

export const fetchPeople = createAsyncThunk('generalTvMaze/people', async ({ page = 0 }: PeopleListProps) => {
  return TvMazeService.getPeopleList(page)
})

export const fetchCast = createAsyncThunk('generalTvMaze/cast', async ({ personId }: CastProps ) => {
  return TvMazeService.getCast(personId)
})

export const fetchSerieById = createAsyncThunk('generalTvMaze/serieById', async ({ serieId }: SerieByIdProps ) => {
  return TvMazeService.getSerie(serieId)
})
