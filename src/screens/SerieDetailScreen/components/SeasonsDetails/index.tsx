import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Episode, Serie } from '../../../../models'
import { useGeneralTvMazeActions } from '../../../../redux/generalTvMaze'
import { NoResults, Separator } from '../../../../utils/components'
import { TEXT_COLOR } from '../../../../utils/constants'
import { loadingImage, removeHtmlTags } from '../../../../utils/utils'

interface SeasonsDetailsProps {
    show: Serie
}

const SeasonsDetails = ({ show }: SeasonsDetailsProps) => {
  const seasons = Object.values(show?.seasons || {})
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const navigation = useNavigation()
  
  interface renderItemProps {
    item: Episode[]
    index: number
  }

  const renderItem = ({item: season, index: seasonNumber}: renderItemProps) => {
    return (
      <View style={styles.seasonsListContainer}>
          <Text style={styles.seasonTitle}>Season {seasonNumber + 1}</Text>
          <Separator height={15} />
          {season.map((episode, i) => {
            const episodeNumber = i + 1
            const episodLabel = episode.type === 'regular' ? `Episode ${episodeNumber}` : 'Special'
          
            return (
              <TouchableOpacity key={`season-inner-${seasonNumber}-${show?.id}-${episodeNumber}`} style={styles.episodeContainer} onPress={() => {
                GeneralTvMazeActions.setEpisodeToReview({ episode })
                navigation.push('serieDetail' as never)
              }}>
                <View>
                  <Image source={{ uri: episode?.image?.original }} defaultSource={loadingImage} style={styles.episodeImage}/>
                </View>
                <View style={styles.rightContainer}>
                  <Text numberOfLines={1} style={styles.episodeText}>{episodLabel}: {episode?.name}</Text>
                  <Separator height={10} />
                  <Text numberOfLines={4} style={styles.summaryText}>{removeHtmlTags(episode.summary || '')}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }
  
  return show.episodesError ? (
    <NoResults text='An error ocurred, try again' reloadResult callback={() => GeneralTvMazeActions.fetchEpisodes({ serieId: show.id })}/>
  ) : (
    <View>
        <FlatList data={seasons} renderItem={renderItem} scrollEnabled={false} nestedScrollEnabled={true} />
    </View>
    )
}

const styles = StyleSheet.create({
  seasonsListContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#3f3f3f',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  seasonTitle: {
    fontFamily: 'arial',
    fontSize: 16,
    color: 'white',
    backgroundColor: '#3f3f3f',
    textAlign: 'center',
  },
  episodeText: {
    fontFamily: 'arial',
    color: TEXT_COLOR,
    textAlign: 'justify',
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 100,
  },
  summaryText: {
    fontFamily: 'arial',
    color: TEXT_COLOR,
    textAlign: 'left',
    marginRight: 100,
  },
  episodeContainer: {
    height: 100,
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    flexGrow: 1,
    marginBottom: 15,
  },
  rightContainer: {
    paddingHorizontal: 10,
  },
  episodeImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
  },
})


export default SeasonsDetails