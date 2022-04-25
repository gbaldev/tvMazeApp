import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Separator, TVMazeModal } from '../../../../utils/components'
import { TEXT_COLOR } from '../../../../utils/constants'

interface SearchModalProps {
  showSearchModal: boolean,
  toggleSearchModal: () => void
  searchPeople?: boolean
}

const SearchModal = ({showSearchModal, toggleSearchModal, searchPeople}: SearchModalProps) => {
  const [searchInput, setSearchInput] = useState('')
  const [enabled, setEnabled] = useState(false)
  const navigation = useNavigation()
  const colorState = useRef(new Animated.Value(0))
  const whatToSearch = searchPeople ? 'people' : 'series'
  const whatToSearchPH = searchPeople ? 'person' : 'show'
  const buttonInterpolation =  colorState.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', '#3c948b']
  })
  const animatedStyle = [
    searchInput.length > 3 ? styles.enabled : styles.disabled, 
    { backgroundColor: buttonInterpolation}
  ]

  const handleSearch = () => {
    navigation.navigate('search' as never, { searchInput, searchPeople } as never)
    toggleSearchModal()
  }
  
  useEffect(() => {
    searchInput.length >= 3 && !enabled && setEnabled(true)
    searchInput.length <3 && enabled && setEnabled(false)
  }, [searchInput])
  useEffect(() => {
    Animated.timing(colorState.current, {
      toValue: enabled ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }, [enabled])

  return (
    <TVMazeModal visible={showSearchModal} modalViewStyle={{padding: 16}} onBackdropTouchEnd={toggleSearchModal}>
      <View style={{ justifyContent: 'center', width: '100%'}}>
        <Text style={styles.searchTitle}>Search {whatToSearch} by name</Text>
        <Separator height={10}/>
        <Separator backgroundColor='gray' />
        <Separator height={20}/>
        <TextInput
          placeholder={`Enter a ${whatToSearchPH} name`}
          value={searchInput}
          style={styles.input}
          onChangeText={(text: string) => setSearchInput(text)}
        />
        <Separator height={15}/>
        <TouchableOpacity disabled={!enabled} onPress={handleSearch}>
          <Animated.View style={animatedStyle}>
            <Text style={styles.searchText}>SEARCH</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </TVMazeModal>
  )
}

const styles = StyleSheet.create({
  input: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
  },
  searchText: {
    fontFamily: 'arial',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  disabled: {
    justifyContent: 'center',
    height: 30,
    width: '100%',
    borderRadius: 16,
  },
  enabled: {
    justifyContent: 'center',
    height: 30,
    width: '100%',
    borderRadius: 16,
  },
  searchTitle: {
    fontFamily: 'arial',
    fontSize: 16,
    color: TEXT_COLOR,
  }
})

export default SearchModal
