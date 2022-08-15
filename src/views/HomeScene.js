import { StyleSheet } from 'react-native'
import React from 'react'
import { Viewport } from '@skele/components'
import { FlashList } from '@shopify/flash-list'

import ShortVideo from '../components/ShareShort'

export default function HomeScene() {
  const posts = [10, 9, 8, 3];

  const renderItem = ({item}) => {
    return (
      <ShortVideo item={item}/>
    )
  };

  return (
    <Viewport.Tracker style={styles.container}>
      <FlashList
        data={posts}
        estimatedItemSize={100}
        initialNumToRender={1}
        windowSize={10}
        keyExtractor={(item)=>item}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={'normal'}
        />
    </Viewport.Tracker>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})