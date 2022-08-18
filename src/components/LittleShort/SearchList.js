import { View, StyleSheet } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'

import themes from '../../values/themes'
import LittleShort from '.'

const SearchList = () => {
    const data = [0, 1, 12, 2];

    const renderItem = ({data}) => {
      return (
        <LittleShort data={data}/>
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
    paddingTop: 10,
  },
})

export default SearchList