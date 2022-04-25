import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { CRITERIA } from 'models/index'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { seriesProvider, useAppSelector } from 'redux/hooks'
import { Screen, TvMazeLoader } from 'utils/components'
import { SeriesCard } from './components'

const HomeScreen = () => {
  const { loading, people } = useAppSelector(state => state.generalTvMaze)
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const fetchedSeries = seriesProvider.getSeriesList().length

  useEffect(() => {
    !fetchedSeries && GeneralTvMazeActions.fetchSeriesList({page : 0})
    !people.length && GeneralTvMazeActions.fetchPeople({page: 0})
  }, [])

  return (
    <Screen>
      {
        !loading ? (
          <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
              <SeriesCard type={CRITERIA.MOST_RATED} />
              <SeriesCard type={CRITERIA.NETFLIX_CHANNEL_AVAILABLE} />
          </ScrollView>
        ) : <TvMazeLoader />
      }
    </Screen>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
      padding: 5,
    },
})

export default HomeScreen