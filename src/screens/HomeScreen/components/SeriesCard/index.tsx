import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CHANNEL, CRITERIA } from '../../../../models'
import { seriesProvider } from '../../../../redux/hooks'
import { Header, SerieDetailRow } from './components'

interface SeriesCardProps {
    type: CRITERIA
}
const SeriesCard = ({ type }: SeriesCardProps) => {
  let shows = seriesProvider.getSeriesList()

  switch (type) {
    case CRITERIA.MOST_RATED:
      shows.sort((showA, showB) => showB?.rating?.average - showA?.rating?.average)
      shows = shows.slice(0, 4)
      break
    case CRITERIA.NETFLIX_CHANNEL_AVAILABLE:
    default:
      shows = shows.filter(show => show?.webChannel?.name?.toLocaleLowerCase() === CHANNEL.NETFLIX).slice(0,4)
      break
  }
  
  return shows.length ? (
    <View style={styles.container}>
      <Header title={type} />
      <SerieDetailRow series={shows.slice(0,2)}/>
      <SerieDetailRow series={shows.slice(2,4)} borderBottom/>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default SeriesCard
