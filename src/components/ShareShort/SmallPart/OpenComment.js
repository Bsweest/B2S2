import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './styles'
import { openCS } from '../../../redux/slices/CommentSectionSlice';

export default function OpenComment({ssid, numCM, setStatus}) {
  const dispatch = useDispatch();

  const [countComment, setCountComment] = useState(numCM);

  const open = () => {
    setStatus(false);
    dispatch(openCS(ssid));
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