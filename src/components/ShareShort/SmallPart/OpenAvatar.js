import { View, Image, StyleSheet, Pressable } from 'react-native'
import { useDispatch } from 'react-redux'
import { openShareProfile } from '../../../redux/slices/ShareProfileSlice';

import FollowButton from './FollowButton'

const OpenAvatar = ({ navigation, opID, isFL }) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(openShareProfile(opID));
    navigation.navigate('ShareProfile');
  }

  return (
    <View style={styles.avatarContainer}>
      <Pressable onPress={open}>
        <Image 
          style={styles.avatarImg}
          source={require('../../../../tests/ninon.jpg')}
        /> 
      </Pressable>
      <FollowButton isFL={isFL}/>
    </View>
  )
}

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
})

export default OpenAvatar