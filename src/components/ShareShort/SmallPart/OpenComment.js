import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import CommentSectionState from '../../../global/CommentSectionState';
import styles from './styles';

export default function OpenComment({ ssid, numCM }) {
  const [countComment, setCountComment] = useState(numCM);

  const open = () => {
    CommentSectionState.set({
      isOpen: true,
      fetchID: ssid,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={open}>
        <View style={styles.commentAddition}>
          <FontAwesome name="commenting" size={36} color={'#FBFBFB'} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{countComment}</Text>
    </View>
  );
}
