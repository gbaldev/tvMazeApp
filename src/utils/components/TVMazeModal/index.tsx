import React, { ReactNode } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

interface TvMazeModalProps {
  visible: boolean
  onBackdropTouchEnd: () => void
  children: ReactNode
  animationType?: 'none' | 'slide' | 'fade'
  height?: number
  backdropStyle?: ViewStyle
  modalViewStyle?: ViewStyle
}

const TVMazeModal = ({
  visible,
  onBackdropTouchEnd,
  children,
  modalViewStyle,
  backdropStyle,
  height,
  animationType
}: TvMazeModalProps) => {
  return (
    <Modal animated animationType={animationType || 'fade'} transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={[{ ...styles.modalView }, { height }, modalViewStyle]}>
            {children}
          </View>
          <View style={styles.backdropContainer}>
            <TouchableOpacity
              style={[styles.modalBackground, backdropStyle]}
              activeOpacity={1}
              onPress={onBackdropTouchEnd}
            />
          </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'gray',
  },
  centeredView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: 'absolute',
    zIndex: 20,
    minWidth: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 0,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  backdropContainer: { position: 'absolute', zIndex: 10, height: '100%', width: '100%' },
})

export default TVMazeModal