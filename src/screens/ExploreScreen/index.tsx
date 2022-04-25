import React, { useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { useGeneralTvMazeActions } from 'redux/generalTvMaze'
import { seriesProvider, useAppSelector } from 'redux/hooks'
import { NoResults, Screen } from 'utils/components'
import { PeoplePreviewCard, SeriePreviewCard } from 'screens/components'
import { SearchModal } from './components'

const ExploreScreen = ({ route }: any) => {
  const onlyFavorites = route?.params?.favorites
  const explorePeople = !!route.params?.explorePeople
  const shows = seriesProvider.getSeriesList(onlyFavorites)
  const people = seriesProvider.getPeople()
  const { actualPage, loading, actualPersonsPage } = useAppSelector(state => state.generalTvMaze)
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
  const GeneralTvMazeActions = useGeneralTvMazeActions()
  const toggleSearchModal = () => setShowSearchModal(prev => !prev)
  const searchIcon = require('../../assets/images/searchicon.png')
  const explore = explorePeople ? 'Explore people!' : 'Explore all shows!'
  const headerTitle = onlyFavorites ? 'Favorites' : explore
  const Icon = () => {
    return (
      <TouchableOpacity onPress={toggleSearchModal}>
        <Image source={searchIcon} style={{height: 20, width: 20}} />
      </TouchableOpacity>
    )
  }
  const EmptyComponent = () => {
    if (onlyFavorites) {
      return <NoResults text={`You don't have any favorites yet`}/>
    } else if (explorePeople) {
      return <NoResults text={`Oops! no persons found.`} />
    }
    return <NoResults text={`Oops! no series found.`}/>
  }

  const dataToDisplay = explorePeople ? people : shows

  const renderItem = ({ item }: any) => {
    if (explorePeople) {
      return <PeoplePreviewCard person={item} />
    } else {
      return <SeriePreviewCard show={item}/>
    }
  }

  const handleOnEndReached = () => {
    if (!onlyFavorites) {
      !explorePeople && GeneralTvMazeActions.fetchSeriesList({ page: actualPage + 1 })
      explorePeople && GeneralTvMazeActions.fetchPeople({ page: actualPersonsPage + 1 })
    }
  }
  
  return (
    <Screen headerTitle={headerTitle} headerRightComponent={<Icon />}>
      <SearchModal showSearchModal={showSearchModal} toggleSearchModal={toggleSearchModal} searchPeople={explorePeople} />
      <View style={styles.scrollViewContainer}>
        <FlatList
          style={styles.flatList}
          data={dataToDisplay as any}
          renderItem={renderItem}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.9}
          ListFooterComponent={() => loading ? <ActivityIndicator /> : null}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    container: {
      width: '100%',
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: 'white',
      maxHeight: 200,
      marginBottom: 10,
    },
    flatList: {
      paddingTop: 16,
    }
})

export default ExploreScreen