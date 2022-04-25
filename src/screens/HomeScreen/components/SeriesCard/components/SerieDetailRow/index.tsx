import React from 'react'
import { FlexStyle, StyleSheet, View } from 'react-native'
import { SerieDetail } from '../'
import { Serie } from 'models/index'

interface SerieDetailRowProps {
    series: Serie[]
    borderBottom?: boolean
}
  
const SerieDetailRow = ({ series, borderBottom }: SerieDetailRowProps) => {
  const styles = getStyles(series.length)
  return series.length ? (
    <View style={[styles.row, borderBottom && styles.borderBottom]}>
      {series[0] && <SerieDetail serie={series[0]} />}
      {series[1] && <SerieDetail serie={series[1]} />}
    </View>
  ) : null
}

const getStyles = (amount: number) => {
  let justify = amount === 1 ? 'flex-start' : 'space-between' as FlexStyle['justifyContent']
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignContent: 'center',
      justifyContent: justify,
      paddingHorizontal: 10,
      paddingBottom: 10,
      backgroundColor: 'white',
    },
    borderBottom: {
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
  })
}
export default SerieDetailRow
