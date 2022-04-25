import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { People } from 'models/index'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { NoResults, Separator, TVMazeModal } from 'utils/components'
import { SCREEN_HEIGHT, TEXT_COLOR } from 'utils/constants'
import { loadingImage } from 'utils/utils'
import SeriePreviewCard from '../SeriePreviewCard'

interface PeoplePreviewCardProps {
  person: People
}

const PeoplePreviewCard = ({ person }: PeoplePreviewCardProps) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
  const toggleModal = () => setShowDetailModal(prev => !prev)
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  
  const handleOnPress = () => {
    if (!person?.castIds) {
      GeneralTvMazeActions.fetchCast({ personId: person.id})
    }
    toggleModal()
  }
  const renderItem = ({item}: any) => (
    <View style={styles.cardContainer}>
      <SeriePreviewCard id={item} callback={toggleModal} />
    </View>
  )

  return (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <TVMazeModal visible={showDetailModal} onBackdropTouchEnd={toggleModal}>
        <>
        <Text style={styles.title}>{person?.name}</Text>
          <View style={styles.detailContainer}>
            <Separator backgroundColor='gray' paddingVertical={10}/>
            <Image source={{uri: person?.image?.original}} defaultSource={loadingImage} style={styles.modalImageStyle}/>
            <Separator backgroundColor='gray' paddingVertical={10}/>
            {person?.loadingCast && <ActivityIndicator style={styles.activity} />}
            {person?.castIds && <FlatList data={person.castIds} renderItem={renderItem} ListEmptyComponent={<NoResults text='No series information available' />} />}
          </View>
        </>
      </TVMazeModal> 
      <View style={styles.leftContainer}>
        <Image source={{uri: person?.image?.medium}} defaultSource={loadingImage} style={styles.image} />
      </View>
      <Text style={styles.title}>{person?.name}</Text>
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
    height: 80,
    width: 80,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  summary: {
    flexShrink: 1,
    fontFamily: 'arial',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: TEXT_COLOR,
  },
  title: {
    paddingTop: 10,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: TEXT_COLOR,
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalImageStyle: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  detailContainer: {
    padding: 10,
    paddingTop: 0,
    width: '100%',
    maxHeight: SCREEN_HEIGHT*0.7
  },
  cardContainer: {
    height: 100,
    flexShrink: 1,
    marginBottom: 20,
    overflow: 'visible',
  },
  activity: {
    height: 130,
  }
})

export default PeoplePreviewCard
