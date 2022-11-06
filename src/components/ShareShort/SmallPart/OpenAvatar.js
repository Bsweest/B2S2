import { Image, Pressable, StyleSheet, View } from 'react-native';

import queryUserData from '../../../../backend/services/ShareProfileServices';
import { clientID } from '../../../global/ClientProfile';
import FollowButton from './FollowButton';

const OpenAvatar = ({ navigation, op_id }) => {
  const isClient = clientID.get() === op_id;

  const { data, isLoading, isError, isSuccess } = queryUserData(op_id);

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
      {isClient ? <></> : <FollowButton op_id={op_id} />}
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
