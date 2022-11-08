import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Authentication from './Authentication';
import Main from './Main';

const AppStack = createNativeStackNavigator();

const Routes = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppStack.Screen name="Authentication" component={Authentication} />
      <AppStack.Screen name="MainApp" component={Main} />
    </AppStack.Navigator>
  );
};

export default Routes;
