import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchList from './SearchList';
import SearchDetails from './SearchDetails';
import SearchInput from './SearchInput';

const NavStack = createNativeStackNavigator();

const CombinedList = () => {
  
  return (
    <NavStack.Navigator 
      initialRouteName='SearchInput'
      screenOptions={{
        headerShown: false,
      }}
    >
      <NavStack.Screen name='SearchInput' component={SearchInput}/>
      <NavStack.Screen name='SearchResults' component={SearchList}/>
      <NavStack.Screen name='SearchDetails' component={SearchDetails}/>
    
    </NavStack.Navigator>
  )
}

export default CombinedList
