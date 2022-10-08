import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useRef } from 'react'

import CombinedList from '../../../components/LittleShort/CombinedList'

import themes from '../../../values/themes'
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux'

export default function SearchScene() {
  const { topVisible } = useSelector(state => state.searchDetails);

  const input = useRef(null);

  const cancel = () => {
    input.current.clear();
  }

  return (
    <View style={styles.container}>

      <View style={[
        styles.searchContainer, 
        { display: topVisible ? 'flex' : 'none' } 
      ]}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input}
            style={styles.input}
            placeholder='Search Short...'
            placeholderTextColor={themes.SECONDCOLOR}
            numberOfLines={1}
          />
          <Pressable style={styles.cancel} onPress={cancel}>
            <MaterialIcons name="cancel" size={24} color={themes.SECONDCOLOR} />
          </Pressable>
        </View>
      </View>
      
      <CombinedList style={styles.result}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    zIndex: 0,
  },
  searchContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 15,
    backgroundColor: themes.BACKGROUND,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 15,
    backgroundColor: themes.CONSTRACT,
    color: themes.COLOR,
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