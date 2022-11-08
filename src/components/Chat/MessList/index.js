import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { queryChatRooms } from '../../../../backend/services/ChatServices';
import themes from '../../../values/themes';
import InputBar from '../../InputBar';
import Messenger from './Messenger';

const TopTab = createMaterialTopTabNavigator();

const MessList = ({ navigation }) => {
  const goToSearchInput = () => {
    navigation.navigate('SearchFriend');
  };

  return (
    <View style={styles.container}>
      <InputBar
        next={goToSearchInput}
        auto={false}
        init={true}
        placeholder="Search Friend..."
      />

      <TopTab.Navigator
        initialRouteName="FriendRooms"
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.label,
        }}
      >
        <TopTab.Screen
          name="FriendRooms"
          component={Rooms}
          initialParams={{ bool: true }}
          options={{
            tabBarLabel: 'Friends',
          }}
        />
        <TopTab.Screen
          name="StrangerRooms"
          component={Rooms}
          initialParams={{ bool: false }}
          options={{
            tabBarLabel: 'Strangers',
          }}
        />
      </TopTab.Navigator>
    </View>
  );
};

const Rooms = ({ navigation, route }) => {
  const { bool } = route.params;
  const { data } = queryChatRooms(bool);

  const renderItem = ({ item }) => {
    return <Messenger passID={item} navigation={navigation} />;
  };

  return (
    <View style={styles.list}>
      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item) => item.room_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  searchContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 15,
    backgroundColor: themes.BACKGROUND,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 15,
    backgroundColor: themes.CONSTRACT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: themes.SIZE,
    color: themes.COLOR,
  },
  cancel: {
    width: 30,
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: themes.BACKGROUND,
    color: themes.COLOR,
    height: 40,
  },
  label: {
    color: themes.COLOR,
    marginTop: -5,
  },
  list: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
});

export default MessList;
