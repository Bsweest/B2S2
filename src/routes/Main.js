import React from 'react'
import { StyleSheet } from "react-native"
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import HomeScene from '../views/HomeScene'
import AddScene from '../views/AddScene'
import InboxScene from '../views/InboxScene'
import ProfileScene from '../views/ProfileScene'
import SearchScene from '../views/SearchScene'

import CommentSection from '../components/Comments/CommentSection'

import Ionicons from '@expo/vector-icons/Ionicons'
import AddShortButton from '../assets/AddShortButton.svg'
import themes from '../values/themes'

const BottomTab = createBottomTabNavigator();
const iconsize = 28;

export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: themes.ACTIVE,
            tabBarStyle: styles.navigator,
          }}
          initialRouteName='Home'
        >
          <BottomTab.Screen name='Home' component={HomeScene} 
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons 
                  name={ focused ? 'ios-home' : 'ios-home-outline' }
                  size={iconsize} 
                  color={ focused ? themes.ACTIVE : themes.INACTIVE}
                />
              ),
              tabBarLabelStyle: styles.label,
            }}
          />
          <BottomTab.Screen name='Search' component={SearchScene} 
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons 
                  name={ focused ? 'ios-search' : 'ios-search-outline' }
                  size={iconsize} 
                  color={ focused ? themes.ACTIVE : themes.INACTIVE}                />
              ),
              tabBarLabelStyle: styles.label,
            }}
          />
          <BottomTab.Screen name='AddShort' component={AddScene} 
            options={{
              tabBarIcon: ({focused}) => (
                <AddShortButton 
                  style={styles.addicon}
                />
              ),
              tabBarLabel: ()=>null,
            }}
          />
          <BottomTab.Screen name='Inbox' component={InboxScene} 
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons 
                  name={ focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-outline' }
                  size={iconsize} 
                  color={ focused ? themes.ACTIVE : themes.INACTIVE}                />
              ),
              tabBarLabelStyle: styles.label,
            }}
          />
          <BottomTab.Screen name='Profile' component={ProfileScene} 
            options={{
              tabBarIcon: ({focused}) => (
                <Ionicons 
                  name={ focused ? 'ios-person' : 'person-outline' }
                  size={iconsize} 
                  color={ focused ? themes.ACTIVE : themes.INACTIVE}                />
              ),
              tabBarLabelStyle: styles.label,
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>

      <CommentSection/>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    elevation: 0,
    backgroundColor: themes.TRANSPARENT,
    borderRadius: 20,
    height: 65,
  },
  addicon: {
    height: 40,
    width: 80,
    marginTop: -15,
  },
  label: {
    fontSize: 13.5,
  }
});