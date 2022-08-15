import { View, Text, StyleSheet, Image } from 'react-native'
import LottieView from 'lottie-react-native'

const Comment = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  avatarContainer: {
    width: 70,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  commenter: {
    
  }
})

export default Comment