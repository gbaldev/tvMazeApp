import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface DetailCardProps {
  cardTitle: string
  children: any
}

const DetailCard = ({ cardTitle, children }: DetailCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{cardTitle}</Text>
      </View>
      <View style={styles.contentContainer}>
        { children }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    paddingTop: 0,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3f3f3f',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex:1,
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
})

export default DetailCard