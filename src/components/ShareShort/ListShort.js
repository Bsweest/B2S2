import { StyleSheet } from 'react-native'
import { Viewport } from '@skele/components'
import { FlashList } from '@shopify/flash-list'
import { useRef } from 'react'

import ShortVideo from '.'

const ListShort = ({ data }) => {
  const list = useRef(null);  

  const renderItem = ({item}) => {
    return (
      <ShortVideo item={item}/>
    )
  };

  return (
    <Viewport.Tracker style={styles.container}>
      <FlashList
        data={data}
        ref={list}
        estimatedItemSize={100}
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

export default ListShort