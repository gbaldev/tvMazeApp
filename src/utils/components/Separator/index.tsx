import React from 'react'
import { View } from 'react-native'

interface SeparatorProps {
  width?: number
  height?: number
  backgroundColor?: string
  paddingVertical?: number
}

const Separator = ({ width = 0, height = 0, backgroundColor = '', paddingVertical = 0 }: SeparatorProps) => {
  const heightOrWidthStyle = { height, width }
  const paddingVerticalStyle = { paddingVertical }
  const isWidthOrHeightSeparator = width || height
  const lineSeparatorStyle = {
    height: 1,
    borderWidth: 0,
    backgroundColor: backgroundColor || '#ffffff29',
  }
  const separatorStyle = isWidthOrHeightSeparator ? heightOrWidthStyle : lineSeparatorStyle
  
  return (
    <View style={paddingVerticalStyle}>
      <View style={separatorStyle} />
    </View>
  )
}

export default Separator
