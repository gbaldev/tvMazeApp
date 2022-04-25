import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TEXT_COLOR } from '../../constants'
import { loadingImage } from '../../utils'

interface NoResultsProps {
  text: string
  callback?: () => void
  reloadResult?: boolean
}

const NoResults = ({ text, reloadResult, callback }: NoResultsProps) => {
  const exclamation = require(`../../../assets/images/exclamation.png`)
  const reload = require(`../../../assets/images/reload.png`)

  return (
    <TouchableOpacity style={styles.noResultsContainer} disabled={!reloadResult} onPress={callback}>
      <View style={styles.noResultsCard}>
          <Image source={reloadResult ? reload : exclamation} style={styles.image} />
          <Text style={styles.noResults}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 16,
  },
  noResultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    fontFamily: 'arial',
    color: TEXT_COLOR,
    fontSize: 17,
  },
  image: {
    height: 60,
    width: 60,
    marginBottom: 15,
  },
  noResultsCard: {
    borderRadius: 16,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default NoResults
