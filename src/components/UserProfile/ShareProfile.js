import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserProfile from '.';
import themes from '../../values/themes';
import SearchDetails from '../SearchPages/SearchDetails';

const ProfileStack = createNativeStackNavigator();

const ShareProfile = ({ route }) => {
  const { op_id } = route.params;

  return (
    <View style={styles.container}>
      <ProfileStack.Navigator
        initialRouteName="UserProfile"
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProfileStack.Screen
          name="UserProfile"
          component={UserProfile}
          initialParams={{ op_id, isScene: false }}
        />
        <ProfileStack.Screen name="UserShort" component={SearchDetails} />
      </ProfileStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
});

export default ShareProfile;
