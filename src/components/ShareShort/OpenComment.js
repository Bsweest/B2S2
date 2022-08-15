import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './styles'
import { openCS } from '../../redux/slices/CommentSectionSlice';

export default function OpenComment({data, setStatus}) {
  const dispatch = useDispatch();

  const open = () => {
    setStatus(false);
    dispatch(openCS(data));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={open}>
        <View style={styles.commentAddition}>
          <FontAwesome 
            name='commenting'
            size={45}
            color={'#FBFBFB'}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>
        100
      </Text>
    </View>
  )
}