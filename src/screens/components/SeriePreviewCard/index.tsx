import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { CALLBACK_TYPE } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture'
import { Serie } from '../../../models'
import { useGeneralTvMazeActions } from '../../../redux/generalTvMaze'
import { seriesProvider, useAppSelector } from '../../../redux/hooks'
import { Separator } from '../../../utils/components'
import { TEXT_COLOR } from '../../../utils/constants'
import { loadingImage } from '../../../utils/utils'

interface SeriePreviewCardProps {
  show?: Serie
  id?: number
  callback?: () => void
}
const SeriePreviewCard = ({ show, id, callback }: SeriePreviewCardProps) => {
  const series = useAppSelector(state => state.generalTvMaze.series)
  const navigation = useNavigation()
  const [showFromId, setShow] = useState<Serie | undefined>()
  const _show = (showFromId || show)
  const [loading, setLoading] = useState<boolean>(false)
  let storedShow = id ? seriesProvider.getSerieById(id) : null
  const handleOnPress = () => {
    callback && callback()
    navigation.navigate('serieDetail' as never, { serieId: _show?.id } as never)
  }
  const GeneralTvMazeActions = useGeneralTvMazeActions()

  const favoriteStyle = {
    borderWidth: _show?.isFavorite ? 5 : 0,
    borderColor: _show?.isFavorite ? '#FFB806' : 'transparent'
  }
  useEffect(() => {
    const fetchSerie = async () => {
      setLoading(true)
      await GeneralTvMazeActions.fetchSerieById({ serieId: id || 0})
      setLoading(false)
    }
    if (id && storedShow) {
      setShow(storedShow)
    } else if (id) {
      fetchSerie()
    }
  }, [series])

  return (
    <TouchableOpacity style={[styles.container, favoriteStyle ]} onPress={handleOnPress} disabled={loading}>
      {loading ? (
        <View style={styles.activityContainer} >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={styles.leftContainer}>
            <Image source={{uri: _show?.image?.medium}} defaultSource={loadingImage} style={styles.image} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{_show?.name}</Text>
            <Separator height={10} />
            <Text numberOfLines={id ? 3 : 40} style={styles.summary}>{_show?.summary}</Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    maxHeight: 200,
    marginBottom: 10,
    borderRadius: 15,
  },
  leftContainer: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flex: 4,
    marginLeft: 0,
  },
  rightContainer: {
    flex: 6,
    height: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
  },
  image: {
    height: '99.9%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  summary: {
    flexShrink: 1,
    fontFamily: 'arial',
    fontSize: 14,
    color: TEXT_COLOR,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: TEXT_COLOR,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SeriePreviewCard
