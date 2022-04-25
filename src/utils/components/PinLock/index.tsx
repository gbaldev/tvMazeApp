import React, { useEffect, useRef, useState } from 'react'
import { Animated, BackHandler, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'
import { TEXT_COLOR } from 'utils/constants'
import { Separator, TVMazeModal } from 'utils/components'

const PinLock = () => {
  const [pinLock, setPinkLock] = useState<boolean>(false)
  const [pin, setPin] = useState<string>('')
  const [confirmationPin, setConfirmationPin] = useState<string>('')
  const [enabled, setEnabled] = useState(false)
  const [error, setError] = useState(false)
  const userPin = useRef<string>('')
  const colorState = useRef(new Animated.Value(0))
  const buttonInterpolation =  colorState.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', '#3c948b']
  })
  const enoughLenght = pin.length >= 4
  const canConfirm = pin === confirmationPin && enoughLenght
  const animatedStyle = [
    styles.button,
    { backgroundColor: buttonInterpolation }
  ]

  const handleCancel = () => {
    AsyncStorage.setItem('USEPIN', 'NO')
    setPinkLock(false)
  }

  const handleConfirm = () => {
    AsyncStorage.setItem('PIN', confirmationPin)
    AsyncStorage.setItem('USEPIN', 'YES')
    setPinkLock(false)
  }

  const handleAuth = () => {
    userPin.current === pin && setPinkLock(false)
    userPin.current !== pin && setError(true)
  }

  useEffect(() => {
    const getConfig = async () => {
      const type = await AsyncStorage.getItem('SECURETYPE')
      const usePin = await AsyncStorage.getItem('USEPIN')
      const pin = await AsyncStorage.getItem('PIN')
      
      if (type === 'FINGER') {
        TouchID.authenticate('Use your fingerprint to gain access')
          .then((_: any) => {}).catch((error: any) => { 
          if (error.code === 'AUTHENTICATION_CANCELED') {
            BackHandler.exitApp()
          }
        })
        return
      }
      if (!usePin || usePin === 'YES') {
        userPin.current = pin || ''
        setTimeout(() => setPinkLock(true), 100)
      }
    }
    getConfig()
  }, [])

  useEffect(() => {
    canConfirm && !userPin.current && !enabled && setEnabled(true)
    !canConfirm && !userPin.current && enabled && setEnabled(false)
    userPin.current && !enabled && enoughLenght && setEnabled(true)
    userPin.current && enabled && !enoughLenght && setEnabled(false)
  }, [pin, confirmationPin])
  
  useEffect(() => {
    Animated.timing(colorState.current, {
      toValue: enabled ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }, [enabled])

  return (
    <>
      <TVMazeModal visible={pinLock} onBackdropTouchEnd={() => {}} modalViewStyle={{padding: 20}} >
        {!userPin.current ? (
          <>
            <Text style={styles.text}>Enter a PIN to protect the app from unauthorized users.</Text>
            <Separator height={5} />
            <Text style={styles.text}>If you dismiss you will be no longer able to set a PIN.</Text>
            <Separator height={15} />
            <TextInput
              placeholder={'Enter your pin'}
              value={pin}
              style={styles.input}
              onChangeText={(text: string) => setPin(text)}
            />
            <Separator height={10} />
            <TextInput
              placeholder={'Confirm your pin'}
              value={confirmationPin}
              style={styles.input}
              onChangeText={(text: string) => setConfirmationPin(text)}
            />
            <Separator height={5} />
            <Text style={styles.detail}>* More than 4 digits, PINS must match</Text>
            <Separator height={15} />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleCancel}>
                <View style={[styles.button, styles.noThanksButton]}>
                  <Text style={styles.noThanks}>NO, THANKS</Text>
                </View>
              </TouchableOpacity>
              <Separator width={10} />
              <TouchableOpacity disabled={!enabled} onPress={handleConfirm}>
                <Animated.View style={animatedStyle}>
                  <Text style={styles.confirmPin}>CONFIRM PIN</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
          <Text style={styles.text}>Please introduce your PIN.</Text>
          <Separator height={15} />
          <TextInput
            placeholder={'Enter your pin'}
            value={pin}
            style={styles.input}
            secureTextEntry
            onChangeText={(text: string) => setPin(text)}
          />
          <Separator height={5} />
            {error && <Text style={styles.error}>* Incorrect PIN</Text>}
          <Separator height={15} />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity disabled={!enabled} onPress={handleAuth}>
              <Animated.View style={animatedStyle}>
                <Text style={styles.confirmPin}>CONFIRM PIN</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </>
        )}
      </TVMazeModal>
    </>
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
  confirmPin: {
    fontFamily: 'arial',
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  noThanks: {
    fontFamily: 'arial',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 30,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'arial',
    fontSize: 14,
    color: TEXT_COLOR,
    textAlign: 'justify',
  },
  error: {
    fontFamily: 'arial',
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  detail: {
    fontFamily: 'arial',
    fontSize: 10,
    color: TEXT_COLOR,
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  noThanksButton: {
    borderColor: 'black',
    borderWidth: 1,
  }
})

export default PinLock