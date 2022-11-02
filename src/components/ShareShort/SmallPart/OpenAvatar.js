import { useQuery } from '@tanstack/react-query';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import getUserProfile from '../../../../backend/services/ShareProfileServices';
import FollowButton from './FollowButton';

const OpenAvatar = ({ navigation, op_id }) => {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id),
    {
      placeholderData: {
        avatar_url: '',
      },
    },
  );

  const open = () => {
    navigation.navigate('ShareProfile', {
      op_id: op_id,
    });
  };

  return (
    <View style={styles.avatarContainer}>
      <Pressable onPress={open}>
        <Image
          style={styles.avatarImg}
          source={
            data.avatar_url
              ? { uri: data.avatar_url }
              : require('../../../assets/placeholder/user.png')
          }
        />
      </Pressable>
      <FollowButton op_id={op_id} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 70,
    height: 75,
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: 'white',
  },
});

export default OpenAvatar;
