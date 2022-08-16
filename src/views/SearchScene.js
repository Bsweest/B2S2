import { View, StyleSheet } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'

import LittleShort from '../components/LittleShort'
import themes from '../values/themes';

export default function SearchScene() {
  const data = [0, 1, 12, 2];

  const renderItem = () => {
    return (
      <LittleShort/>
    )
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item)=>item}
        numColumns={2}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
    paddingHorizontal: '2%',
  },
  
})