import { Ionicons } from '@expo/vector-icons';
import { Motion } from '@legendapp/motion';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import mutateFollow from '../../../backend/mutation/FollowServices';
import getUserProfile, {
  getInteractNumbers,
  getShortsOfUser,
  isFollowingOP,
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

  const { data } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id),
    {
      placeholderData: {
        displayname: '',
      },
    },
  );

  const { data: isFL } = useQuery(['is_following', op_id], () =>
    isFollowingOP(op_id),
  );

  const { data: interactNumber, isSuccess: doneNumbers } = useQuery(
    ['get_interact_numbers', op_id],
    () => getInteractNumbers(op_id),
  );
  const { data: userShorts, isSuccess: doneShorts } = useQuery(
    ['get_user_shorts', op_id],
    () => getShortsOfUser(op_id),
  );

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
              <Pressable onPress={updateFollow}>
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
                    {isFL ? 'Followed' : 'Follow'}
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
        <TopBarShare displayname={data.displayname} goBack={goBack} />
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
    backgroundColor: themes.INACTIVE,
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
