import { StyleSheet } from 'react-native'
import { Viewport } from '@skele/components'
import { FlashList } from '@shopify/flash-list'
import { useRef } from 'react'
import { View } from 'react-native'

import ShortVideo from '.'

const ListShort = ({ data, navigation }) => {
  const list = useRef(null);  

  const renderItem = ({item}) => {
    return (
      <ShortVideo item={item} navigation={navigation} modal={false}/>
    )
  };

  return (
    <View style={styles.container}>
      <Viewport.Tracker>
        <FlashList
          data={data}
          ref={list}
          estimatedItemSize={100}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          pagingEnabled
          decelerationRate={'normal'}
          />
      </Viewport.Tracker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default ListShort