import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { queryExploreFeed } from '../../../../backend/services/GetNewFeed';
import ChatScreen from '../../../components/Chat/ChatScreen';
import ListShort from '../../../components/ShareShort/ListShort';
import ShareProfile from '../../../components/UserProfile/ShareProfile';

const HomeStack = createNativeStackNavigator();

export default function HomeScene() {
  return (
    <View style={styles.container}>
      <HomeStack.Navigator
        initialRouteName="NewFeed"
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name="NewFeed" component={NewFeed} />
        <HomeStack.Screen name="ShareProfile" component={ShareProfile} />
        <HomeStack.Screen name="ChatScreen" component={ChatScreen} />
      </HomeStack.Navigator>
    </View>
  );
}

const NewFeed = ({ navigation }) => {
  const { data, isSuccess, isLoading, isError } = queryExploreFeed();

  return (
    <View style={styles.container}>
      {data ? (
        <ListShort data={data} navigation={navigation} initialIndex={0} />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
