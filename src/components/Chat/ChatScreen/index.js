import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import { useEffect, useState, useCallback } from 'react'
import { Bubble, Send, GiftedChat } from 'react-native-gifted-chat'

import themes from '../../../values/themes';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 'user1',
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 'user2',
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, [])
  
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props) => {
    return (
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
          source={require('../../../assets/placeholder/user.png')}
        />
        <Text style={styles.name}>
          Messenger
        </Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{_id: 'user1'}}
        alwaysShowSend
        renderBubble={renderBubble}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderSend={renderSend}
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