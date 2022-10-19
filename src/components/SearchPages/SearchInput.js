import { StyleSheet, View, Text } from 'react-native'

import searchKeys from '../../assets/persist_storage/SearchKeywords';
import { For } from '@legendapp/state/react';
import themes from '../../values/themes';

const SearchInput = () => {
  

  const renderItem = (item) => {
    return (
      <Text style={styles.keys}>
        {item}
      </Text>
    )
  }

  return (
    <View style={styles.container}>
      <For each={searchKeys} item={renderItem}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keys: {
    fontSize: themes.SIZE,
    color: themes.ACTIVE,
  }
})

export default SearchInput