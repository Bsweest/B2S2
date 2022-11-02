import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import themes from '../../../values/themes';

import UserProfile from '../../../components/UserProfile';
import SearchDetails from '../../../components/SearchPages/SearchDetails'

const ProfileStack = createNativeStackNavigator();

import TempID from '../../../../tests/TempID';

export default function ProfileScene() {
  const op_id = TempID;

  return (
    <View style={styles.container}>
      <ProfileStack.Navigator
        initialRouteName='OwnProfile'
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProfileStack.Screen 
          name='OwnProfile' 
          component={UserProfile}
          initialParams={{op_id}}
        />
        <ProfileStack.Screen name='UserShort' component={SearchDetails}/>
      </ProfileStack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  }
})