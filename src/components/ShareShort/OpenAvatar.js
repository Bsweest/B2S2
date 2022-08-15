import { View, Image, StyleSheet } from 'react-native'

import FollowButton from './FollowButton'

export default function OpenAvatar() {
  return (
    <View style={styles.avatarContainer}>
      <Image 
        style={styles.avatarImg}
        source={require('../../../tests/ninon.jpg')}
      /> 
      <FollowButton/>
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
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'white',
  },
})