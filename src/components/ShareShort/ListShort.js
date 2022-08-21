import { StyleSheet } from 'react-native'
import { Viewport } from '@skele/components'
import { FlashList } from '@shopify/flash-list'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import ShortVideo from '.'

const ListShort = ({ isMain, data }) => {
  const list = useRef(null);
  const { index } =  useSelector(state => state.searchDetails);

  useEffect(() => {
    if(!isMain){
      list.current?.scrollToIndex({
        index,
        animated: false,
      });
    }
  
  }, [index])
  

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