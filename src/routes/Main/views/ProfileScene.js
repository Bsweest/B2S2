import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import TempID from '../../../../tests/TempID';
import SearchDetails from '../../../components/SearchPages/SearchDetails';
import UserProfile from '../../../components/UserProfile';
import themes from '../../../values/themes';

const ProfileStack = createNativeStackNavigator();

export default function ProfileScene() {
  const op_id = TempID;

  return (
    <View style={styles.container}>
      <ProfileStack.Navigator
        initialRouteName="OwnProfile"
        screenOptions={{
          headerShown: false,
        }}
      >
        <ProfileStack.Screen
          name="OwnProfile"
          component={UserProfile}
          initialParams={{ op_id }}
        />
        <ProfileStack.Screen name="UserShort" component={SearchDetails} />
      </ProfileStack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
});
