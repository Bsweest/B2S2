import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useState } from 'react'

import themes from '../../../values/themes'

const Messenger = ({ item, navigation }) => {

  const [read, setRead] = useState(true);

  const openChat = () => {
    navigation.navigate('ChatScreen');
  }

  return (
    <Pressable onPress={openChat}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/placeholder/user.png')}
          style={styles.avatar}
        />
        <View style={styles.messageContainer}>
          <Text style={[styles.messenger, {
            fontWeight: read ? 'normal' : 'bold',
            color: read ? themes.SECONDCOLOR : themes.COLOR, 
          }]}>
              Messenger
          </Text>
          <Text style={[styles.lastMessage, {
            fontWeight: read ? 'normal' : 'bold',
            color: read ? themes.SECONDCOLOR : themes.COLOR, 
          }]}>
              lastMessage
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

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
  }
})

export default Messenger