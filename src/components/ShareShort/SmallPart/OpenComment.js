import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text, View } from 'react-native';

import CommentSectionState from '../../../global/CommentSectionState';
import styles from './styles';

const OpenComment = ({ ssid, numCM }) => {
  const open = () => {
    CommentSectionState.set({
      isOpen: true,
      fetchID: ssid,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={open}>
        <View style={styles.commentAddition}>
          <FontAwesome name="commenting" size={36} color={'#FBFBFB'} />
        </View>
      </Pressable>
      <Text style={styles.text}>{numCM}</Text>
    </View>
  );
};

export default OpenComment;
