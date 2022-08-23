import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'

import themes from '../../../values/themes'

const Messenger = ({ item }) => {
  const [read, setRead] = useState(false);

  return (
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
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 15,
  },
  messageContainer: {
    flexDirection: 'row',
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