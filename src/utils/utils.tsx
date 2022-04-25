import React from 'react'
import { Text } from 'react-native'

export const removeHtmlTags = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim()
export const listElements = (g: string, i: number, amount: number) => `${g}${i !==  amount -1 ? ', ' : ''}`
export const bold = (text: string | number) => <Text style={{ fontWeight: 'bold' }}>{text}</Text>
export const loadingImage = require('../assets/images/loadingimage.png')