import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { seriesProvider, useAppSelector } from 'redux/hooks'
import { NoResults, Screen, TvMazeLoader } from 'utils/components'
import { PeoplePreviewCard, SeriePreviewCard } from '../components'

const SearchScreen = ({ route }: any) => {
  const { loading, searchResults: { serieLastResults, serieLastSearch, personsLastSearch, personsLastResults } } = useAppSelector(state => state.generalTvMaze )
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const searchPeople = !!route.params?.searchPeople
  const data = searchPeople ? seriesProvider.getPeopleFromIdList(personsLastResults) : seriesProvider.getFromIdList(serieLastResults)
  const searchInput = route.params?.searchInput
  const headerTitle = `Results for: ${searchInput}`
  const renderItem = ({item}: any) => {
    return searchPeople ? <PeoplePreviewCard person={item} /> : <SeriePreviewCard show={item} />
  }

  useEffect(() => {
    const checkFetchNeed = async () => {
      if (searchPeople) {
        if (personsLastSearch === searchInput) return
        GeneralTvMazeActions.fetchPersonsByName({ name: searchInput })

      }
      if (serieLastSearch === searchInput) return
      GeneralTvMazeActions.fetchSerieByName({ name: searchInput })
    }
    checkFetchNeed()
  }, [])
  
  return (
    <Screen headerTitle={headerTitle}>
      {
        !loading ? (
          <FlatList
            contentContainerStyle={styles.scrollViewContainer}
            data={data as any}
            renderItem={renderItem}
            ListEmptyComponent={() => <NoResults text={`There are no resutls for: ${searchInput}`} />}
            showsVerticalScrollIndicator={false}
          />
        ) : <TvMazeLoader />
      }

    </Screen>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
      padding: 16,
    },
})

export default SearchScreen
