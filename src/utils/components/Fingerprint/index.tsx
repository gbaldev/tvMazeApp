import React, { useEffect } from 'react'
import TouchID from 'react-native-touch-id';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TEXT_COLOR } from 'utils/constants';
import TVMazeModal from '../TVMazeModal';
import Separator from '../Separator';

interface FingerprintProps {
  showAskForTouch: boolean
  setShowAskForTouch: (b: boolean) => void
}
const Fingerprint = ({showAskForTouch, setShowAskForTouch}: FingerprintProps) => {
  useEffect(() => {
    const setLockType = async () => {
      let type = await AsyncStorage.getItem('SECURETYPE')
      if (!type && TouchID.isSupported()) {
        setShowAskForTouch(true)
      }
    }
    if (Platform.OS === 'android') {
      setLockType()
    } else {
      AsyncStorage.setItem('SECURETYPE', 'PIN')
    }
  })

  const handleCancel = () => {
    AsyncStorage.setItem('SECURETYPE', 'PIN')
    setShowAskForTouch(false)
  }

  const handleConfirm = () => {
    AsyncStorage.setItem('SECURETYPE', 'FINGER')
    setShowAskForTouch(false)
  }

  return (
    <TVMazeModal visible={showAskForTouch} onBackdropTouchEnd={() => {}} modalViewStyle={{ padding: 20}}>
      <>
      <Text style={styles.text}>Do you want to use fingerprint to protect the app from unauthorized users?</Text>
      <Separator height={5} />
      <Text style={styles.text}>If you dismiss you will be no longer able to set a fingerprint protection.</Text>
      <Separator height={15} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCancel}>
          <View style={[styles.button, styles.noThanksButton]}>
            <Text style={styles.noThanks}>NO, THANKS</Text>
          </View>
        </TouchableOpacity>
        <Separator width={10} />
        <TouchableOpacity onPress={handleConfirm}>
          <View style={[styles.button, styles.acceptButton]}>
            <Text style={styles.accept}>ACCEPT</Text>
          </View>
        </TouchableOpacity>
      </View>
      </>
    </TVMazeModal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'arial',
    fontSize: 14,
    color: TEXT_COLOR,
    textAlign: 'justify',
  },
  accept: {
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
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  noThanksButton: {
    borderColor: 'black',
    borderWidth: 1,
  },
  acceptButton: {
    backgroundColor: '#3c948b',
  }
})

export default Fingerprint