import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import CombinedList from '../components/LittleShort/CombinedList'

import themes from '../values/themes'
import { MaterialIcons } from '@expo/vector-icons'; 

export default function SearchScene() {

  const input = useRef(null);

  const cancel = () => {
    input.current.clear();
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input}
            style={styles.input}
            placeholder='Search Short...'
            numberOfLines={1}
          />
          <Pressable style={styles.cancel} onPress={cancel}>
            <MaterialIcons name="cancel" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <CombinedList/>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'none',
  },
  container: {
    flex: 1,
    backgroundColor: themes.ACTIVE,
  },
  searchContainer: {
    height: 55,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    position: 'absolute',
    right: 10,
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