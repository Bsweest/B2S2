import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from '.'
import SearchDetails from '../SearchPages/SearchDetails';

import themes from '../../values/themes'
import { Ionicons } from '@expo/vector-icons'

import SearchState from '../../global/SearchState';

const ProfileStack = createNativeStackNavigator();

const ShareProfile = ({ route, navigation }) => {
  const { op_id, displayname } = route.params;

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={[
        styles.topBar, 
        { display: SearchState.hideTop.get() ? 'none' : 'flex' } 
      ]}>
        <Text style={styles.nickname}>
          {displayname}
        </Text>
        <View style={styles.buttons}>
          <Pressable onPress={goBack}>
            <Ionicons name="ios-arrow-back" 
              size={30} color="white"
              style={styles.btnAll}
            />
          </Pressable>
          <Pressable>
            <Ionicons name="chatbubbles-sharp" 
              size={25} color="white"
              style={styles.btnAll}
            />
          </Pressable>
        </View>
      </View>

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

export default ShareProfile