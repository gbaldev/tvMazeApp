import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Serie } from '../../../../../../models'
import { TEXT_COLOR } from '../../../../../../utils/constants'
import { listElements, loadingImage } from '../../../../../../utils/utils'

interface SerieDetailProps {
    serie: Serie
}

const SerieDetail = ({ serie }: SerieDetailProps) => {
  const serieGenres = serie.genres.length
  const navigation = useNavigation()
  const handleOnPress = () => navigation.navigate('serieDetail' as never, { serieId: serie.id } as never)

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity style={styles.totalWidth} onPress={handleOnPress}>
        <Image source={{uri: serie.image.original}} defaultSource={loadingImage}  style={styles.image} />
      </TouchableOpacity>
      <View style={{paddingHorizontal: 5, paddingBottom: 10}}>
        <Text style={styles.name}>{serie?.name}</Text>
        {serieGenres && <Text style={styles.genres}>Genres: {serie?.genres?.map((s,i) => listElements(s, i, serieGenres))}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  name: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'arial',
  },
  genres: {
    color: TEXT_COLOR,
    fontSize: 14,
    fontFamily: 'arial',
  },
  totalWidth: {
    width: '100%',
  },
  image: {
    height: 300,
    width: '98%',
    resizeMode: 'contain',
  }
})

export default SerieDetail
