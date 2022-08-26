import { Image, StyleSheet, View } from "react-native"
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context"

import HomeScene from './views/HomeScene'
import AddScene from './views/AddScene'
import InboxScene from './views/InboxScene'
import ProfileScene from './views/ProfileScene'
import SearchScene from './views/SearchScene'

import CommentSection from '../../components/Comments/CommentSection'

import Ionicons from '@expo/vector-icons/Ionicons'
import themes from "../../values/themes"

const BottomTab = createBottomTabNavigator();
const iconsize = 25;

const getTabBarStyleSearch = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'SearchResults';
  switch (routeName) {
    case 'SearchResults':
      return (styles.navigator);
    case 'SearchDetails':
      return (styles.none);
  }
}

const getTabBarStyleInbox = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'MessList';
  switch (routeName) {
    case 'MessList':
      return (styles.navigator);
    case 'ChatScreen':
      return (styles.none);
  }
}

const getTabBarStyleHome = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'NewFeed';
  switch (routeName) {
    case 'NewFeed':
      return (styles.navigator);
    case 'ShareProfile':
      return (styles.none);
  }
}

export default function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <BottomTab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: themes.ACTIVE,
              tabBarStyle: styles.navigator,
              tabBarHideOnKeyboard: true,
            }}
            initialRouteName='Home'
          >
            <BottomTab.Screen name='Home' component={HomeScene} 
              options={ ({route}) => ({
                tabBarIcon: ({focused}) => (
                  <Ionicons 
                    name={ focused ? 'ios-home' : 'ios-home-outline' }
                    size={iconsize} 
                    color={ focused ? themes.ACTIVE : themes.INACTIVE}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleHome(route),
              })}
            />
            <BottomTab.Screen name='Search' component={SearchScene} 
              options={ ({route}) => ({
                tabBarIcon: ({focused}) => (
                  <Ionicons 
                    name={ focused ? 'ios-search' : 'ios-search-outline' }
                    size={iconsize} 
                    color={ focused ? themes.ACTIVE : themes.INACTIVE}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleSearch(route),
              })}
            />
            <BottomTab.Screen name='AddShort' component={AddScene} 
              options={{
                tabBarIcon: () => (
                  <View style={styles.addicon}>
                    <Image 
                      source={require('../../assets/AddShortButton.png')}
                      style={styles.icon}
                    />
                  </View>
                ),
                tabBarLabel: ()=>null,
              }}
            />
            <BottomTab.Screen name='Inbox' component={InboxScene} 
              options={ ({route}) => ({
                tabBarIcon: ({focused}) => (
                  <Ionicons 
                    name={ focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-outline' }
                    size={iconsize} 
                    color={ focused ? themes.ACTIVE : themes.INACTIVE}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleInbox(route),
              })}
            />
            <BottomTab.Screen name='Profile' component={ProfileScene} 
              options={{
                tabBarIcon: ({focused}) => (
                  <Ionicons 
                    name={ focused ? 'ios-person' : 'person-outline' }
                    size={iconsize} 
                    color={ focused ? themes.ACTIVE : themes.INACTIVE}
                  />
                ),
                tabBarLabelStyle: styles.label,
              }}
            />
          </BottomTab.Navigator>
          
          <CommentSection/>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navigator: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    borderRadius: 20,
    height: 48,
    borderTopWidth: 0,
    backgroundColor: themes.TRANSPARENT,
  },
  addicon: {
    height: 30,
    width: 50,
    marginTop: -14,
  },
  icon: {
    height: 35,
    width: 60,
    overflow: 'visible',
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
  },
  none: {
    display: 'none'
  }
});