import { FontAwesome, Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';

import mutateChat, {
  mutateLastReadMess,
} from '../../../../backend/mutation/ChatMutation';
import { queryInfiniteMessages } from '../../../../backend/services/ChatServices';
import queryUserData, {
  ClientData,
} from '../../../../backend/services/ShareProfileServices';
import ChatRoomInFocused from '../../../global/ChatRoomInFocused';
import themes from '../../../values/themes';

const ChatScreen = ({ route, navigation }) => {
  const { room_id, op_id, lastID } = route.params;
  const { data: clientData } = ClientData();

  const [messages, setMessages] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const { data: messData } = queryUserData(op_id);

  const { data, isLoading, isError, isSuccess } =
    queryInfiniteMessages(room_id);

  const { mutate, isLoading: addChat } = mutateChat(room_id);
  const { mutate: changeLastMess } = mutateLastReadMess(room_id);

  const client = {
    _id: clientData.id,
    name: clientData.displayname,
    avatar: clientData.avatar_url,
  };
  const mess = {
    _id: messData.id,
    name: messData.displayname,
    avatar: messData.avatar_url,
  };

  useEffect(() => {
    ChatRoomInFocused.set(room_id);

    return () => {
      ChatRoomInFocused.set();
    };
  }, []);

  useEffect(() => {
    if (!data) return;

    if (lastID !== data[0].id)
      changeLastMess({ room_id: room_id, messID: data[0].id });

    const convert = data.map(({ id, created_at, sender, content }) => ({
      _id: id,
      text: content,
      createdAt: created_at,
      user: sender === client._id ? client : mess,
    }));

    setMessages(convert);
  }, [data]);

  const onClick = () => {
    setIsClicked((prev) => !prev);
  };

  const onSend = useCallback((messages = []) => {
    mutate({ content: messages[0].text, room_id: room_id });
  }, []);

  const renderBubble = (props) => {
    return (
      <View
        style={{
          alignItems:
            props.currentMessage.user._id === client._id
              ? 'flex-end'
              : 'flex-start',
        }}
      >
        <Bubble
          {...props}
          style={styles.bubble}
          wrapperStyle={{
            left: {
              backgroundColor: themes.CONSTRACT,
            },
            right: {
              backgroundColor: '#A334FA',
            },
          }}
          textStyle={{
            left: {
              color: themes.ACTIVE,
            },
            right: {
              color: themes.ACTIVE,
            },
          }}
        />

        {isClicked && (
          <Text style={styles.time}>
            {moment(props.currentMessage.createdAt).format('LT')}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color="white"
            style={styles.goBack}
          />
        </Pressable>
        <Image
          style={styles.avatar}
          source={
            messData.avatar_url
              ? { uri: messData.avatar_url }
              : require('../../../assets/placeholder/user.png')
          }
        />
        <Text style={styles.name}>{messData.displayname}</Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: clientData.id }}
        alwaysShowSend
        renderBubble={renderBubble}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
        renderTime={() => {}}
        onPress={onClick}
      />
    </View>
  );
};

const scrollToBottomComponent = () => {
  return <FontAwesome name="angle-double-down" size={24} color="white" />;
};

const renderSend = (props) => {
  return (
    <Send {...props}>
      <View>
        <FontAwesome
          name="send"
          size={24}
          color="#2e64e5"
          style={styles.send}
        />
      </View>
    </Send>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  topBar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: themes.ACTIVE,
  },
  goBack: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    color: themes.COLOR,
    fontWeight: 'bold',
  },
  bubble: {
    paddingVertical: 2,
  },
  time: {
    color: themes.SECONDCOLOR,
  },
  send: {
    marginBottom: 11,
    marginRight: 11,
  },
});
