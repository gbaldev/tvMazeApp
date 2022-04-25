import React, { useEffect } from 'react'
import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { seriesProvider, useAppSelector } from 'redux/hooks'
import { Screen, Separator } from 'utils/components'
import { bold, listElements, loadingImage, removeHtmlTags } from 'utils/utils'
import { DetailCard, SeasonsDetails } from './components'

const SerieDetailScreen = ({ route }: any) => {
  let episode = useAppSelector(state => state.generalTvMaze.selectedEpisode)
  let serieId = route?.params?.serieId
  let serie =  serieId && seriesProvider.getSerieById(serieId)
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const favoriteSelected = require('../../assets/images/favoriteselected.png')
  const favoriteUnselected = require('../../assets/images/favoriteunselected.png')
  const headerTitle = serieId && serie?.name || episode?.name
  const sourceImage = {uri: serie?.image?.original || episode?.image?.original || ''}
  const handleFavorite = () => GeneralTvMazeActions.toggleFavorite({ serieId: serie.id })
  
  const FavoriteIcon = () => {
    return serieId ? (
      <TouchableOpacity onPress={handleFavorite}>
        <Image source={serie?.isFavorite ? favoriteSelected : favoriteUnselected} style={styles.favIcon} />
      </TouchableOpacity>
    ) : null
  }

  useEffect(() => {
    if (serieId && serie && !Object.entries(serie?.seasons || []).length) {
      GeneralTvMazeActions.fetchEpisodes({ serieId: serie.id })
    }
  }, [])
  
  return (
    <Screen headerTitle={headerTitle} headerRightComponent={<FavoriteIcon />}>
      <ImageBackground source={sourceImage} style={styles.imageBg}>
      </ImageBackground>
      <ScrollView style={styles.scrollView}>
          {serieId && serie ? (
            <>
              <DetailCard cardTitle='SERIE INFORMATION'>
                <Image source={{ uri: serie?.image?.medium }} defaultSource={loadingImage} style={styles.image} />
                <Separator height={15} />
                <Text>{bold('Name')}: {serie?.name}</Text>
                <Separator height={10} />
                <Text>{bold('Genres')}: {serie?.genres?.map((d: any, i: number) => listElements(d,i, serie.genres.length)) || '-'}</Text>
                <Separator height={10} />
                <Text>{bold('Summary')}: {serie?.summary}</Text>
              </DetailCard>

              <Separator height={15} />

              <DetailCard cardTitle='SCHEDULE INFORMATION'>
                <Text>{bold('Channel')}: {serie?.webChannel?.name || '-'}</Text>
                <Separator height={10} />
                <Text>{bold('Transmission days')}: {serie?.schedule?.days?.map((d: any, i: number) => listElements(d,i, serie.schedule.days.length)) || '-'}</Text>
                <Separator height={10} />
                <Text>{bold('Transmission time')}: {serie?.schedule?.time || ''}</Text>
              </DetailCard>
              
              <Separator height={15} />
              
              <DetailCard cardTitle='SEASONS INFORMATION'>
                {serie?.loadingEpisodes && <ActivityIndicator style={{ paddingVertical: 20 }} />}
                <SeasonsDetails show={serie}/>
              </DetailCard>
            </>
          ) : (
            <>
            <DetailCard cardTitle='EPISODE INFORMATION'>
                <Image source={{ uri: episode?.image?.medium }} defaultSource={loadingImage} style={styles.episodeImage} />
                <Separator height={15} />
                <Text>{bold('Name')}: {episode?.name}</Text>
                <Separator height={10} />
                <Text>{bold('Episode number')}: {episode?.number || 'Special'}</Text>
                <Separator height={10} />
                <Text>{bold('Season')}: {episode?.season}</Text>
                <Separator height={10} />
                <Text>{bold('Summary')}: {removeHtmlTags(episode?.summary || '')}</Text>
              </DetailCard>
            </>
          )}
          <Separator height={80} />
        </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  imageBg: {
    height: '100%',
    opacity: 0.65,
  },
  image: {
    height: 500,
  },
  episodeImage: {
    height: 200,
    resizeMode: 'contain',
  },
  scrollView: {
    padding: 16,
    position: 'absolute',
    marginTop: 60,
    top: 0,
    bottom: -40,
    left: 0,
    right: 0,
  },
  favIcon: {
    height: 25,
    width: 25,
  }
})
export default SerieDetailScreen
