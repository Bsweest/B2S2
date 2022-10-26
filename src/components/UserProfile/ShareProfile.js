import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from '.'
import SearchDetails from '../SearchPages/SearchDetails';

import themes from '../../values/themes'

const ProfileStack = createNativeStackNavigator();

const ShareProfile = ({ route }) => {
  const { op_id } = route.params;

  return (
    <View style={styles.container}>
      <ProfileStack.Navigator
        initialRouteName='UserProfile'
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProfileStack.Screen
          name='UserProfile' 
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

export default ShareProfile