import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp';
import ForgotPassword from './containers/ForgotPassword'
import ResetPassword from './containers/ResetPassword'
import SignUpWithEmail from './containers/SignUpWithEmail'
import LoginWithEmail from './containers/LoginWithEmail'
import OTPCode from './containers/OTPCode'

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="LogIn" component={LogIn} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{headerShown: false}} name="ResetPassword" component={ResetPassword} />
        <Stack.Screen options={{headerShown: false}} name="SignUpWithEmail" component={SignUpWithEmail} />
        <Stack.Screen options={{headerShown: false}} name="LoginWithEmail" component={LoginWithEmail} />
        <Stack.Screen options={{headerShown: false}} name="OTPCode" component={OTPCode} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default index

const styles = StyleSheet.create({})