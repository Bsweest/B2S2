import { StyleSheet, Dimensions } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'

import ShortVideo from '.'
import { useState, useCallback } from 'react'

import Constants from 'expo-constants';

const windowHeight = Dimensions.get('window').height;

const ListShort = ({ data, navigation }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const VIDEOHEIGHT = windowHeight - Constants.statusBarHeight - 45;

  const renderItem = ({ item, index }) => {
    return (
      <ShortVideo 
        item={item} 
        navigation={navigation} 
        shouldPlay={focusedIndex === index}
        VIDEOHEIGHT={VIDEOHEIGHT}
      />
    )
  };

  const handleScroll = useCallback(({ nativeEvent: {contentOffset:{ y }}}) => {
    const offset = Math.round(y / VIDEOHEIGHT);
  
    if(offset!==focusedIndex) setFocusedIndex(offset);
  }, [setFocusedIndex]);

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        onScroll={handleScroll}
        estimatedItemSize={100}
        keyExtractor={(item)=>item.id}
        renderItem={renderItem}
        pagingEnabled
        decelerationRate={'normal'}
        ListFooterComponent={footer}
      />
    </View>
  )
}

const footer = () => {
  <View style={styles.footer}>

  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: 'black'
  }
})

export default ListShort