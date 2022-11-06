import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, View } from 'react-native';

import styles from './styles';

export default function ShareButton() {
  return (
    <View style={styles.shareContainer}>
      <Pressable>
        <View style={styles.icon}>
          <FontAwesome
            style={styles.commentAddition}
            name="share"
            size={36}
            color={'#FBFBFB'}
          />
        </View>
      </Pressable>
    </View>
  );
}
