import { View, StyleSheet, Pressable, Modal, Dimensions } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { closeModalShort } from '../../redux/slices/ModalShortSlice';
import { openCS } from '../../redux/slices/CommentSectionSlice';

const feedItemHeight = Dimensions.get('window').height;
const feedItemWidth = Dimensions.get('window').width;
import { MaterialIcons } from '@expo/vector-icons'; 
import ShortVideo from '.'

const ModalShort = () => {
  const dispatch = useDispatch();
  const {isVisible, data} = useSelector(state => state.modalShort);

  const close = () => {
    dispatch(closeModalShort());
  }
  const press = () => {
    dispatch(openCS(data));
  }

  return (
    <Modal
        animationType='fade'
        visible={isVisible}
        onRequestClose={close}
        style={styles.modal}
      >
        <Pressable style={styles.container} onPress={press}>
          {/* <ShortVideo/> */}
          {/* <Pressable onPress={close}>
            <MaterialIcons 
              name="arrow-back" 
              size={30} 
              color="#FBFBFB" 
              style={styles.icon}/>
          </Pressable>*/}
        </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    height: feedItemHeight,
    width: feedItemWidth,
  },
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  icon: {
    position: 'absolute',
    marginTop: 5,
    marginLeft: 5,
    zIndex: 20,
  }
})

export default ModalShort