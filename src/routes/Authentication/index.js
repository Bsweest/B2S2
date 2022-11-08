import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LogIn from './Views/Login';
import LoginWithEmail from './Views/LoginWithEmail';
import SignUp from './Views/SignUp';
import SignUpWithEmail from './Views/SignUpWithEmail';

const AuthStack = createNativeStackNavigator();

const Authentication = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="LogIn" component={LogIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignUpWithEmail" component={SignUpWithEmail} />
      <AuthStack.Screen name="LoginWithEmail" component={LoginWithEmail} />
    </AuthStack.Navigator>
  );
};

export default Authentication;
