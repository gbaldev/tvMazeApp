import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "redux/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const seriesProvider = {
  getSeriesList: (onlyFavorites = false) => {
    const series = useAppSelector(state => state.generalTvMaze.series)
    let allSeries = Object.values(series)
    return onlyFavorites ? allSeries.filter(s => s.isFavorite).sort((a, b) =>  a?.name?.localeCompare(b?.name)) : allSeries
  },
  getSerieById: (serieId: number) => {
    const series = useAppSelector(state => state.generalTvMaze.series)
    return series[serieId]
  },
  getFromIdList: (idList: number[]) => {
    const series = useAppSelector(state => state.generalTvMaze.series)
    let fromListSeries = []
    for (let id of idList) {
        fromListSeries.push(series[id])
    }
    return fromListSeries
  },
  getPeople: () => {
    const people = useAppSelector(state => state.generalTvMaze.people)
    let allPeople = Object.values(people)
    return allPeople.sort((a, b) =>  a?.name?.localeCompare(b?.name))
  },
  getPeopleFromIdList: (idList: number[]) => {
    const people = useAppSelector(state => state.generalTvMaze.people)
    let fromListPeople = []
    for (let id of idList) {
        fromListPeople.push(people[id])
    }
    return fromListPeople
  },
  // getPeopleByName: (name: string) => {
  //     const people = useAppSelector(state => state.generalTvMaze.people)
  //     return people.filter(person => person.name.toLowerCase().match(name.toLowerCase()))
  // }

}