import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { queryLastMessage } from '../../../../backend/services/ChatServices';
import ListenChatroom from '../../../../backend/services/RealTimeChat';
import queryUserData from '../../../../backend/services/ShareProfileServices';
import { clientID } from '../../../global/ClientProfile';
import themes from '../../../values/themes';

const Messenger = ({ passID, navigation }) => {
  const { room_id, parti_id: op_id } = passID;
  const client = clientID.get();

  const { data, isLoading, isError, isSuccess } = queryUserData(op_id);
  const { data: lastMessage } = queryLastMessage(room_id);

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
            {lastMessage.sender === client ? 'You: ' : ''}
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
