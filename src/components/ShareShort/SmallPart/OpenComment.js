import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './styles'

import CommentSectionState from '../../../global/CommentSectionState';

export default function OpenComment({ ssid, numCM }) {
  const [countComment, setCountComment] = useState(numCM);

  const open = () => {
    CommentSectionState.set({
      isOpen: true,
      fetchID: ssid
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={open}>
        <View style={styles.commentAddition}>
          <FontAwesome 
            name='commenting'
            size={36}
            color={'#FBFBFB'}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>
        {countComment}
      </Text>
    </View>
  )
}