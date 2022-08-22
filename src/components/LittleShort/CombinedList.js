import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import SearchList from './SearchList';
import SearchDetails from './SearchDetails';

const NavStack = createStackNavigator();

const CombinedList = () => {
  return (
    <NavStack.Navigator 
      initialRouteName='SearchResults'
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <NavStack.Screen name='SearchResults' component={SearchList}/>
      <NavStack.Group screenOptions={{ presentation: 'modal' }}>
        <NavStack.Screen name='SearchDetails' component={SearchDetails}/>
      </NavStack.Group>
    </NavStack.Navigator>
  )
}

export default CombinedList

const styles = StyleSheet.create({})