import { useQuery } from '@tanstack/react-query';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { getLastMessage } from '../../../../backend/services/ChatServices';
import ListenChatroom from '../../../../backend/services/RealTimeChat';
import getUserProfile from '../../../../backend/services/ShareProfileServices';
import TempID from '../../../../tests/TempID';
import themes from '../../../values/themes';

const Messenger = ({ passID, navigation }) => {
  const { room_id, parti_id: op_id } = passID;

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id),
    {
      placeholderData: {
        avatar_url: '',
      },
    },
  );
  const { data: lastMessage } = useQuery(
    ['get_last_message', room_id],
    () => getLastMessage(room_id),
    {
      placeholderData: {
        content: '',
        read_status: true,
      },
    },
  );

  ListenChatroom(room_id);

  const openChat = () => {
    navigation.navigate('ChatScreen', {
      room_id: room_id,
      op_id: op_id,
    });
  };

  return (
    <Pressable onPress={openChat}>
      <View style={styles.container}>
        <Image
          source={
            data.avatar_url
              ? { uri: data.avatar_url }
              : require('../../../assets/placeholder/user.png')
          }
          style={styles.avatar}
        />
        <View style={styles.messageContainer}>
          <Text
            style={[
              styles.messenger,
              {
                fontWeight: lastMessage.read_status ? 'normal' : 'bold',
                color: lastMessage.read_status
                  ? themes.SECONDCOLOR
                  : themes.COLOR,
              },
            ]}
          >
            {data.displayname}
          </Text>
          <Text
            style={[
              styles.lastMessage,
              {
                fontWeight: lastMessage.read_status ? 'normal' : 'bold',
                color: lastMessage.read_status
                  ? themes.SECONDCOLOR
                  : themes.COLOR,
              },
            ]}
          >
            {lastMessage.sender === TempID ? 'You: ' : ''}
            {lastMessage.content}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  messageContainer: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  messenger: {
    fontSize: themes.SIZE,
  },
  lastMessage: {
    fontSize: themes.NOTE,
  },
});

export default Messenger;
