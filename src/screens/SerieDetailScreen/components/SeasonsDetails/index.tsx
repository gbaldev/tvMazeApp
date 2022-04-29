import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Episode, Serie } from 'models/index'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { NoResults, Separator } from 'utils/components'
import { TEXT_COLOR } from 'utils/constants'
import { loadingImage, removeHtmlTags } from 'utils/utils'
import { useAppSelector } from 'redux/hooks'

interface SeasonsDetailsProps {
    show: Serie
}

const SeasonsDetails = ({ show }: SeasonsDetailsProps) => {
  const seasons = Object.values(show?.seasons || {})
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const navigation = useNavigation()
  const [selectedSeason, setSelectedSeason] = useState<{ number: number, season: Episode[] } | null>(null)
  const titleStyle = (seasonNumber: number) => (styles[seasonNumber === selectedSeason?.number ? 'selectedSeason' : 'notSelectedSeason'])

  useEffect(() => seasons[0] &&setSelectedSeason({number: 1, season: seasons[0]}), [show.loadingEpisodes])

  const RenderSeason = () => {
    return (
      <View style={styles.seasonsListContainer}>
          {selectedSeason?.season.map((episode, i) => {
            const episodeNumber = i + 1
            const episodLabel = episode.type === 'regular' ? `Episode ${episodeNumber}` : 'Special'
          
            return (
              <TouchableOpacity style={styles.episodeContainer} onPress={() => {
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
        {selectedSeason && !show.loadingEpisodes && (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seriesTitle} contentContainerStyle={styles.seriesTitleContainer}>
            {
              seasons.map((s, i) => {
                return (
                  <Text style={[styles.season, titleStyle(i+1)]} onPress={() => setSelectedSeason({season: s, number: i+1})}>Season {i + 1}</Text>
                )
              })
            }
          </ScrollView>
            <RenderSeason />
          </>
        )}
    </View>
    )
}

const styles = StyleSheet.create({
  seasonsListContainer: {
    marginTop: 5,
    width: '100%',
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
  season: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 16,
    color: TEXT_COLOR,
    paddingRight: 15,
  },
  seriesTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesTitle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    height: 40,
  },
  selectedSeason: {
    fontWeight: 'bold',
  },
  notSelectedSeason: {
    fontWeight: '200',
  }
})


export default SeasonsDetails