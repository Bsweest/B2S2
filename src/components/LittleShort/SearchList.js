import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { FlashList } from '@shopify/flash-list'

import themes from '../../values/themes'
import LittleShort from '.'

const SearchList = ({ navigation }) => {

  const data = [0, 1, 12, 2, 4, 6];

  const renderItem = ({item, index}) => {
    return (
      <LittleShort navigation={navigation} index={index} item={item}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={6}
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
    paddingLeft: '3%',
    paddingTop: 10,
  },
})

export default SearchList