import React, { useEffect } from 'react'
import { Animated, Image, StyleSheet, View } from 'react-native'
import { useAppSelector } from 'redux/hooks'
import { SCREEN_HEIGHT } from 'utils/constants'

const TvMazeLoader = () => {
  const loading = useAppSelector(state => state.generalTvMaze.loading)
  const tvmazelogo = require('../../../assets/images/tvmazelogo.png')
  const loadingtext = require('../../../assets/images/loading.png')
  const animatedImageOpacity = new Animated.Value(0)
  const animatedOpacity = { opacity: animatedImageOpacity } as any
  
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedImageOpacity, { toValue: 1, duration: 1100, useNativeDriver: true }),
          Animated.timing(animatedImageOpacity, { toValue: 0, duration: 1100, useNativeDriver: true }),
          Animated.timing(animatedImageOpacity, { toValue: 1, duration: 1100, useNativeDriver: true }),
          Animated.timing(animatedImageOpacity, { toValue: 0, duration: 1100, useNativeDriver: true }),
        ])
      ).start()
    }
  }, [loading])

  return (
    <Animated.View style={[styles.loader, animatedOpacity]}>
      <View>
        <Image source={tvmazelogo} style={[{ height: 100, width: 100, marginTop: SCREEN_HEIGHT*0.25 }]} />
        <Image source={loadingtext} style={{width: 100}}/>
      </View>
    </Animated.View>
  ) 
}

const styles = StyleSheet.create({
  loader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
})
export default TvMazeLoader
