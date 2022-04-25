import { useRef } from 'react'
import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { Episode, People, Serie } from '../../models'
import { fetchEpisodes, fetchSerieByName, fetchSeriesList, fetchPeople, fetchPersonsByName, fetchCast, fetchSerieById } from './actions'
import { fetchEpisodesReducer, fetchSerieByNameReducer, fetchSeriesListReducer, fetchPeopleReducer, fetchPersonsByNameReducer, fetchCastReducer, fetchSerieByIdReducer  } from './reducers'
import { useAppDispatch } from '../hooks'


export interface GeneralTvMazeState {
  loading: boolean
  series: { [id: string]: Serie }
  selectedEpisode: Episode | null
  actualPage: number
  people: { [id: string]: People }
  actualPersonsPage: number
  searchResults: {
    serieLastSearch: string
    serieLastResults: number[]
    personsLastSearch: string
    personsLastResults: number[]
  },
}

const initialState: GeneralTvMazeState = {
  loading: false,
  selectedEpisode: null,
  series: {},
  actualPage: 0,
  actualPersonsPage: 0,
  people: {},
  searchResults: {
    serieLastSearch: '',
    serieLastResults: [],
    personsLastSearch: '',
    personsLastResults: [],
  },
}


export const generalTvMazeSlice = createSlice({
    name: 'generalTvMaze',
    initialState,
    reducers: {
        reset: () => initialState,
        toggleFavorite: (state: GeneralTvMazeState, action) => {
            let serie = { ...state.series[action.payload.serieId], isFavorite: !state.series[action.payload.serieId].isFavorite }
            state.series[action.payload.serieId] = serie
        },
        setEpisodeToReview: (state: GeneralTvMazeState, action) => {
          state.selectedEpisode = action.payload.episode
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSeriesList.pending, fetchSeriesListReducer.pending)
        builder.addCase(fetchSeriesList.fulfilled, fetchSeriesListReducer.fulfilled)
        builder.addCase(fetchSeriesList.rejected, fetchSeriesListReducer.rejected)

        builder.addCase(fetchSerieByName.pending, fetchSerieByNameReducer.pending)
        builder.addCase(fetchSerieByName.fulfilled as any, fetchSerieByNameReducer.fulfilled)
        builder.addCase(fetchSerieByName.rejected, fetchSerieByNameReducer.rejected)

        builder.addCase(fetchEpisodes.pending, fetchEpisodesReducer.pending)
        builder.addCase(fetchEpisodes.fulfilled, fetchEpisodesReducer.fulfilled)
        builder.addCase(fetchEpisodes.rejected, fetchEpisodesReducer.rejected)

        builder.addCase(fetchPeople.pending, fetchPeopleReducer.pending)
        builder.addCase(fetchPeople.fulfilled, fetchPeopleReducer.fulfilled)
        builder.addCase(fetchPeople.rejected, fetchPeopleReducer.rejected)

        builder.addCase(fetchPersonsByName.pending, fetchPersonsByNameReducer.pending)
        builder.addCase(fetchPersonsByName.fulfilled as any, fetchPersonsByNameReducer.fulfilled)
        builder.addCase(fetchPersonsByName.rejected, fetchPersonsByNameReducer.rejected)

        builder.addCase(fetchCast.pending, fetchCastReducer.pending)
        builder.addCase(fetchCast.fulfilled as any, fetchCastReducer.fulfilled)
        builder.addCase(fetchCast.rejected, fetchCastReducer.rejected)

        builder.addCase(fetchSerieById.pending, fetchSerieByIdReducer.pending)
        builder.addCase(fetchSerieById.fulfilled as any, fetchSerieByIdReducer.fulfilled)
        builder.addCase(fetchSerieById.rejected, fetchSerieByIdReducer.rejected)
    },
})

export function useGeneralTvMazeActions() {
    const dispatch = useAppDispatch()
    const actions = {
        ...generalTvMazeSlice.actions,
        fetchSeriesList,
        fetchSerieByName,
        fetchEpisodes,
        fetchPeople,
        fetchPersonsByName,
        fetchCast,
        fetchSerieById,
    }
    const refActions = useRef(bindActionCreators(actions, dispatch))
    return refActions.current
}

export default generalTvMazeSlice.reducer
