import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlashList from '@shopify/flash-list/dist/FlashList'

import Messenger from './Messenger'

const MessList = () => {
  const data = [1, 2, 3, 5 , 4];

  const renderItem = ({ item }) => {
    return (
      <Messenger item={item}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item)=>item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default MessList