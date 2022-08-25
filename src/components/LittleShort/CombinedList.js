import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchList from './SearchList';
import SearchDetails from './SearchDetails';

const NavStack = createNativeStackNavigator();

const CombinedList = () => {
  return (
    <NavStack.Navigator 
      initialRouteName='SearchResults'
      screenOptions={{
        headerShown: false,
      }}
    >
      <NavStack.Screen name='SearchResults' component={SearchList}/>
      <NavStack.Screen name='SearchDetails' component={SearchDetails}/>
    
    </NavStack.Navigator>
  )
}

export default CombinedList
