import { StyleSheet, View } from 'react-native'
import React from 'react'
import FlashList from '@shopify/flash-list/dist/FlashList'

import Messenger from './Messenger'

import themes from '../../../values/themes'
import { MaterialIcons } from '@expo/vector-icons'; 

const MessList = ({ navigation }) => {
  const data = [1, 2, 3, 5 , 4];
  const input = useRef(null);

  const cancel = () => {
    input.current.clear();
  }

  const renderItem = ({ item }) => {
    return (
      <Messenger item={item} navigation={navigation}/>
    )
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input}
            style={styles.input}
            placeholder='Search Friend...'
            numberOfLines={1}
          />
          <Pressable style={styles.cancel} onPress={cancel}>
            <MaterialIcons name="cancel" size={24} color={themes.SECONDCOLOR} />
          </Pressable>
        </View>
      </View>

      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item)=>item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 15,
    backgroundColor: themes.CONSTRACT,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 15,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: themes.SIZE,
  },
  cancel: {
    width: 30,
    alignItems: 'center',
  }
})

export default MessList