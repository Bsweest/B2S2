import { Ionicons } from '@expo/vector-icons';
import { Motion } from '@legendapp/motion';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import mutateFollow from '../../../backend/mutation/FollowServices';
import { createRoom } from '../../../backend/services/ChatServices';
import { findRoomID } from '../../../backend/services/GetFriends';
import queryUserData, {
  queryCheckFollow,
  queryCheckFollowBack,
  queryInteractNumbers,
  queryShortsOfuser,
} from '../../../backend/services/ShareProfileServices';
import { clientID } from '../../global/ClientProfile';
import FormatInteractNumber from '../../hooks/NumBro';
import themes from '../../values/themes';
import Library from './Library';
import TopBarClient from './TopBar/TopBarClient';
import TopBarShare from './TopBar/TopBarShare';

const UserProfile = ({ route, navigation }) => {
  const { op_id, isScene } = route.params;
  const isClient = op_id === clientID.get();

  const [numbers, setNumbers] = useState([0, 0, 0]);

  const { data } = queryUserData(op_id);

  const { data: isFL } = queryCheckFollow(op_id);
  const { data: isFLBack } = queryCheckFollowBack(op_id);

  const { data: interactNumber, isSuccess: doneNumbers } =
    queryInteractNumbers(op_id);
  const { data: userShorts, isSuccess: doneShorts } = queryShortsOfuser(op_id);

  useEffect(() => {
    if (interactNumber) setNumbers(FormatInteractNumber(interactNumber));
  }, [doneNumbers]);

  const { mutate, isLoading } = mutateFollow(op_id);

  const updateFollow = () => {
    mutate({ op_id: op_id, bool: !isFL });
  };

  const renderItem = ({ item, index }) => {
    return <Library data={item} navigation={navigation} index={index} />;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToSetting = () => {
    navigation.navigate('ProfileSetting');
  };

  const chat = async () => {
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

  const header = () => {
    return (
      <>
        {doneShorts && doneNumbers ? (
          <View style={styles.topContainer}>
            <Image
              style={styles.avatar}
              source={
                data.avatar_url
                  ? { uri: data.avatar_url }
                  : require('../../assets/placeholder/user.png')
              }
            />

            <Text style={styles.username}>@{data.username}</Text>

            <View style={styles.statisticsContainer}>
              <View style={styles.boxSide}>
                <Text style={styles.number}>{numbers[2]}</Text>
                <Text style={styles.note}>Following</Text>
              </View>

              <View style={styles.line} />

              <View style={styles.boxMain}>
                <Text style={styles.number}>{numbers[1]}</Text>
                <Text style={styles.note}>Follower</Text>
              </View>

              <View style={styles.line} />

              <View style={styles.boxSide}>
                <Text style={styles.number}>{numbers[0]}</Text>
                <Text style={styles.note}>Hearts</Text>
              </View>
            </View>

            {isClient ? (
              <Pressable onPress={goToSetting}>
                <View
                  style={[
                    styles.btnFollow,
                    {
                      backgroundColor: themes.COLOR,
                    },
                  ]}
                >
                  <Text style={styles.textOfBtn}>Setting</Text>
                  <Ionicons
                    name="settings"
                    size={26}
                    style={styles.settingIcon}
                  />
                </View>
              </Pressable>
            ) : (
              <Motion.Pressable onPress={updateFollow}>
                <Motion.View
                  style={styles.btnFollow}
                  animate={{
                    backgroundColor: isFL ? themes.COLOR : '#EA4359',
                  }}
                  transition={{
                    type: 'tween',
                    duration: 1000,
                  }}
                >
                  <Motion.Text
                    style={styles.textOfBtn}
                    animate={{
                      color: isFL ? '#EA4359' : themes.COLOR,
                    }}
                  >
                    {isFL ? 'Followed' : isFLBack ? 'Follow Back' : 'Follow'}
                  </Motion.Text>
                </Motion.View>
              </Motion.Pressable>
            )}

            <Text style={styles.bio} numberOfLines={3}>
              {data.bio}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isClient ? (
        <TopBarClient
          displayname={data.displayname}
          goBack={goBack}
          isScene={isScene}
        />
      ) : (
        <TopBarShare
          displayname={data.displayname}
          goBack={goBack}
          chat={chat}
        />
      )}

      <FlashList
        data={userShorts}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={header}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  topContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    marginBottom: 0.5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: themes.BIG,
    color: themes.ACTIVE,
  },
  statisticsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  boxMain: {
    width: 80,
    alignItems: 'center',
  },
  boxSide: {
    width: 80,
    alignItems: 'center',
  },
  line: {
    height: '55%',
    width: 1,
    marginHorizontal: 10,
    backgroundColor: themes.SECONDCOLOR,
  },
  number: {
    color: themes.COLOR,
    fontWeight: 'bold',
    fontSize: themes.BIG,
  },
  note: {
    color: themes.COLOR,
    fontWeight: '600',
    fontSize: themes.SIZE,
  },
  btnFollow: {
    borderRadius: 10,
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textOfBtn: {
    fontSize: themes.BIG,
    fontWeight: 'bold',
  },
  bio: {
    color: themes.COLOR,
    fontSize: themes.SIZE,
    margin: 15,
  },
  settingIcon: {
    marginLeft: 2,
  },
});

export default UserProfile;
