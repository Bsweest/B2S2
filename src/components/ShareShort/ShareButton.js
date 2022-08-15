import { View, TouchableOpacity } from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './styles'

export default function ShareButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.icon}>
          <FontAwesome 
            style={styles.commentAddition}
            name='share'
            size={40}
            color={'#FBFBFB'}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}