import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { Bubble, Send, GiftedChat } from 'react-native-gifted-chat'

import themes from '../../../values/themes';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query';

import ClientProfile from '../../../global/ClientProfile'
import { getInfiniteMessages } from '../../../../backend/services/ChatServices';
import getUserProfile from '../../../../backend/services/ShareProfileServices';
import moment from 'moment';
import mutateChat from '../../../../backend/mutation/ChatMutation';

const ChatScreen = ({ route, navigation }) => {
  const { room_id, op_id } = route.params;
  const clientData = ClientProfile.get();

  const [messages, setMessages] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const { data: messData } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id)
  )

  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get_chatroom', room_id],
    () => getInfiniteMessages(room_id)
  )
  const { mutate, isLoading:addChat } = mutateChat(); 

  const client = {
    _id: clientData.id,
    name: clientData.displayname,
    avatar: clientData.avatar_url,
  }
  const mess = {
    _id: messData.id,
    name: messData.displayname,
    avatar: messData.avatar_url,
  }

  useEffect(() => {
    if(!data) return;
    const convert = data.map(({ id, created_at, sender, content, read_status }) => ({
      _id: id,
      text: content,
      createdAt: created_at,
      user: sender === client._id ? client : mess,
    }))

    setMessages(convert);
  }, [data])

  const onClick = () => {
    setIsClicked((prev) => !prev);
  }
  
  const onSend = useCallback((messages = []) => {
    mutate({ content: messages[0].text, room_id: room_id })
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <View style = {{ 
        alignItems: props.currentMessage.user._id === client._id ? 'flex-end' : 'flex-start' 
      }}>
        <Bubble
          {...props}
          style={styles.bubble}
          wrapperStyle={{
            left: {
              backgroundColor: themes.CONSTRACT,
            },
            right: {
              backgroundColor: '#A334FA',
            }
          }}
          textStyle={{
            left: {
              color: themes.ACTIVE
            },
            right: {
              color: themes.ACTIVE
            }
          }}
        />
        
        {isClicked &&
        <Text style={styles.time}>
          {moment(props.currentMessage.createdAt).format("LT")}
        </Text>}

      </View>
      
    )
  }

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name="angle-double-down" size={24} color="white"/>
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <FontAwesome name="send" 
            size={24} color="#2e64e5"
            style={styles.send}
          />
        </View>
      </Send>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={()=> navigation.goBack()}>
          <Ionicons name="ios-arrow-back" 
            size={30} color="white"
            style={styles.goBack}
          />
        </Pressable>
        <Image
          style={styles.avatar}
          source={messData.avatar_url ? 
            {uri: messData.avatar_url}
            :
            require('../../../assets/placeholder/user.png')}
        />
        <Text style={styles.name}>
          {messData.displayname}
        </Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: TempID}}
        alwaysShowSend
        renderBubble={renderBubble}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
        renderTime={()=>{}}
        onPress={onClick}
      />
    </View>
  )
}

export default ChatScreen

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
    fontWeight: 'bold'
  },
  bubble: {
    paddingVertical: 2,
  },
  time: {
    color: themes.SECONDCOLOR,
  },
  send: {
    marginBottom: 11, 
    marginRight: 11
  }
})