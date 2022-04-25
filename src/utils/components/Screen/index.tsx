import React from 'react'
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native'
import { AppHeader } from 'navigation/components'

interface ScreenProps {
  children: React.ReactNode[] | React.ReactNode
  headerRightComponent?: React.ReactNode[] | React.ReactNode
  headerTitle?: string
  style?: ViewStyle
  disableHeader?: boolean
}

const Screen = ({ children, style, headerTitle, headerRightComponent, disableHeader }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, style]}>
      {!disableHeader && <AppHeader title={headerTitle} rightComponent={headerRightComponent}/>}
        {children}
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    postion: 'relative',
  }
})

export default Screen