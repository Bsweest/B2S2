import { View, TouchableOpacity } from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome';

import styles from './styles'

export default function ShareButton() {
  return (
    <View style={styles.shareContainer}>
      <TouchableOpacity>
        <View style={styles.icon}>
          <FontAwesome 
            style={styles.commentAddition}
            name='share'
            size={36}
            color={'#FBFBFB'}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}