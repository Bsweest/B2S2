import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { FlashList } from '@shopify/flash-list'
import { useDispatch } from 'react-redux'
import { getSearchDetails } from '../../redux/slices/SearchDetailsSlice'

import themes from '../../values/themes'
import LittleShort from '.'

const SearchList = ({ navigation }) => {
  const dispatch = useDispatch();

  const data = [0, 1, 12, 2];

  useEffect(() => {
    dispatch(getSearchDetails(data));
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <LittleShort index={index} navigation={navigation}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={8}
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