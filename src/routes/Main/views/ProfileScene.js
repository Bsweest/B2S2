import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SearchDetails from '../../../components/SearchPages/SearchDetails';
import UserProfile from '../../../components/UserProfile';
import ProfileSetting from '../../../components/UserProfile/ProfileSetting';
import UpdateField from '../../../components/UserProfile/UpdateField';
import { clientID } from '../../../global/ClientProfile';
import themes from '../../../values/themes';

const ProfileStack = createNativeStackNavigator();

export default function ProfileScene() {
  const client = clientID.get();
  const op_id = client;

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
          initialParams={{ op_id, isScene: true }}
        />
        <ProfileStack.Screen name="UserShort" component={SearchDetails} />
        <ProfileStack.Screen name="ProfileSetting" component={ProfileSetting} />
        <ProfileStack.Screen name="UpdateField" component={UpdateField} />
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
