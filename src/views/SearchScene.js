import { View, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import SearchList from '../components/LittleShort/SearchList'
import SearchDetails from '../components/LittleShort/SearchDetails';

import themes from '../values/themes'
import { MaterialIcons } from '@expo/vector-icons'; 

const NavStack = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export default function SearchScene() {

  return (
    <NavStack.Navigator 
      initialRouteName='Results'
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
        <NavStack.Screen name='SearchResults' component={Results}/>
        <NavStack.Screen name='SearchDetails' component={SearchDetails}/>
    </NavStack.Navigator>
  )
}

const Results = () => {
  const input = useRef(null);

  const cancel = () => {
    input.current.clear();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialIcons name="arrow-back" size={24} color="black" style={styles.btnBack}/>
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

      <TopTab.Navigator>
        <TopTab.Screen name='Top' component={SearchList}/>
        <TopTab.Screen name='New' component={SearchList}/>
      </TopTab.Navigator>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    marginHorizontal: 10,
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