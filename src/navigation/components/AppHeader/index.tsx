import React from 'react'
import { View, Platform, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Separator } from '../../../utils/components'
const isAndroid = Platform.OS === 'android'

interface AppHeaderProps {
  title?: string
  rightComponent?: React.ReactNode[] | React.ReactNode
}

const AppHeader = ({ title, rightComponent }: AppHeaderProps) => {
  const navigation = useNavigation()
  const tvMazeLogo = require('../../../assets/images/tvmazelogo.png')
  const tvMazeTextLogo = require('../../../assets/images/tvmazeheadertext.png')
  const goback = require('../../../assets/images/goback.png')

  return (
    <View style={styles.header}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.button} disabled={!title} onPress={() => navigation.goBack()}>
            { title && <Image source={goback} style={styles.goback} />}
            <Image source={tvMazeLogo} style={[styles.logo, !title && styles.marginRight]} />
          </TouchableOpacity>
          { !title &&  <Image source={tvMazeTextLogo} style={styles.textLogo} />}
          { title && (
            <Text style={[styles.text, styles.title]}>
              {title}
            </Text>
          )}
          {rightComponent && title && (
          <View style={styles.rightComponent}>
            {rightComponent}
          </View>
          )}
        </View>
        { !title && (
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('explore' as never, { favorites: true } as never)}>
              <Text style={styles.text}>FAVS</Text>
            </TouchableOpacity>
            <Separator width={15} />
            <TouchableOpacity onPress={() => navigation.navigate('explore' as never, { explorePeople: true } as never)}>
              <Text style={styles.text}>PEOPLE</Text>
            </TouchableOpacity>
            <Separator width={15} />
            <TouchableOpacity onPress={() => navigation.navigate('explore' as never)}>
              <Text style={styles.text}>SERIES</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: '#3c948b',
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  goback: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginRight: 5,
  },
  textLogo: {
    alignSelf: 'center',
  },
  marginRight: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 0,
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center'
  },
  leftContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  button: {
    flexDirection: 'row',
  },
  rightComponent: {
    alignSelf: 'center',
  }
})

export default AppHeader