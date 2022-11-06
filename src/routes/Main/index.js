import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector } from '@legendapp/state/react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import CommentSection from '../../components/Comments/CommentSection';
import themes from '../../values/themes';
import AddScene from './views/AddScene';
import HomeScene from './views/HomeScene';
import InboxScene from './views/InboxScene';
import ProfileScene from './views/ProfileScene';
import SearchScene from './views/SearchScene';

const BottomTab = createBottomTabNavigator();
const iconsize = 25;

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
            initialRouteName="Home"
          >
            <BottomTab.Screen
              name="Home"
              component={HomeScene}
              options={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={iconsize}
                    color={focused ? themes.ACTIVE : themes.SECONDCOLOR}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleHome(route),
              })}
            />
            <BottomTab.Screen
              name="Search"
              component={SearchScene}
              options={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={focused ? 'ios-search' : 'ios-search-outline'}
                    size={iconsize}
                    color={focused ? themes.ACTIVE : themes.SECONDCOLOR}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleSearch(route),
              })}
            />
            <BottomTab.Screen
              name="AddShort"
              component={AddScene}
              options={{
                tabBarIcon: () => (
                  <View style={styles.addicon}>
                    <Image
                      source={require('../../assets/AddShortButton.png')}
                      style={styles.icon}
                    />
                  </View>
                ),
                tabBarLabel: () => null,
              }}
            />
            <BottomTab.Screen
              name="Inbox"
              component={InboxScene}
              options={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={
                      focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-outline'
                    }
                    size={iconsize}
                    color={focused ? themes.ACTIVE : themes.SECONDCOLOR}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleInbox(route),
              })}
            />
            <BottomTab.Screen
              name="Profile"
              component={ProfileScene}
              options={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={focused ? 'ios-person' : 'person-outline'}
                    size={iconsize}
                    color={focused ? themes.ACTIVE : themes.SECONDCOLOR}
                  />
                ),
                tabBarLabelStyle: styles.label,
                tabBarStyle: getTabBarStyleProfile(route),
              })}
            />
          </BottomTab.Navigator>

          <CommentSection />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navigator: {
    height: 45,
    borderTopWidth: 0,
    backgroundColor: themes.BACKGROUND,
    borderTopWidth: 0.5,
    borderTopColor: themes.ACTIVE,
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
    display: 'none',
  },
  placeholder: {
    height: 44,
  },
});

const getTabBarStyleHome = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'NewFeed';
  switch (routeName) {
    case 'NewFeed':
      return styles.navigator;
    default:
      return styles.none;
  }
};

const getTabBarStyleSearch = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'SearchTrend';
  switch (routeName) {
    case 'SearchDetails':
      return styles.none;
    default:
      return styles.navigator;
  }
};

const getTabBarStyleInbox = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'MessList';
  switch (routeName) {
    case 'ChatScreen':
      return styles.none;
    default:
      return styles.navigator;
  }
};

const getTabBarStyleProfile = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'OwnProfile';
  switch (routeName) {
    case 'OwnProfile':
      return styles.navigator;
    default:
      return styles.none;
  }
};
