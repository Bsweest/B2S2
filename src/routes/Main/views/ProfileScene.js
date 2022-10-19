import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import themes from '../../../values/themes';

import UserProfile from '../../../components/UserProfile';
import SearchDetails from '../../../components/LittleShort/SearchDetails';

import SearchState from '../../../global/SearchState';

const ProfileStack = createNativeStackNavigator();

import TempID from '../../../../tests/TempID';

export default function ProfileScene() {

  const op_id = TempID;

  return (
    <View style={styles.container}>
      <View style={[
        styles.topBar, 
        { display: SearchState.hideTop.get() ? 'none' : 'flex' } 
      ]}>
        <Text style={styles.nickname}>
          CLIENTNAME
        </Text>
        <View style={styles.buttons}>
          
        </View>
      </View>

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
        <ProfileStack.Screen name='OwnShort' component={SearchDetails}/>
      </ProfileStack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  topBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: themes.BIG,
    color: themes.COLOR,
  },
  buttons: {
    position: 'absolute',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAll: {
    marginHorizontal: 10,
  },
})