import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { CRITERIA } from 'models/index'

interface HeaderProps {
    title: CRITERIA
  }

  const Header = ({ title }: HeaderProps) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    )
  }

  const styles = StyleSheet.create({
    header: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      width: '100%',
      padding: 10,
      justifyContent: 'center',
      backgroundColor: '#3f3f3f',
    },
    headerText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: 'arial',
    },
  })
  
  export default Header
