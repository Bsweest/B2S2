import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { createRoom } from '../../../../backend/services/ChatServices';
import queryAllFriend, {
  findRoomID,
} from '../../../../backend/services/GetFriends';
import themes from '../../../values/themes';
import InputBar from '../../InputBar';

const SearchFriend = ({ navigation }) => {
  const [friend, setFriend] = useState([]);

  const { data, isLoading, isSuccess } = queryAllFriend();

  const goBack = () => {
    navigation.goBack();
  };

  const searchFriend = (value) => {
    setFriend(
      data.filter((each) =>
        each.displayname.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const goToChatroom = async (op_id) => {
    const room_id = await findRoomID(op_id);

    if (room_id) {
      navigation.navigate('ChatScreen', {
        room_id: room_id,
        op_id: op_id,
      });
    } else {
      const newID = await createRoom(op_id);
      navigation.navigate('ChatScreen', {
        room_id: newID,
        op_id: op_id,
      });
    }
  };

  const renderSearch = ({ item }) => {
    return (
      <Pressable onPress={() => goToChatroom(item.id)}>
        <View style={styles.itemContainer}>
          <Image
            style={styles.avatar}
            source={
              item.avatar_url
                ? { uri: item.avatar_url }
                : require('../../../assets/placeholder/user.png')
            }
          />
          <Text style={styles.name}>{item.displayname}</Text>
        </View>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InputBar
        prev={goBack}
        auto={true}
        init={false}
        searchFriend={searchFriend}
        placeholder="Search Friends..."
      />

      <FlashList
        data={friend}
        renderItem={renderSearch}
        estimatedItemSize={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  loading: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  name: {
    color: themes.COLOR,
    fontSize: themes.SIZE,
    fontWeight: '400',
  },
});

export default SearchFriend;
