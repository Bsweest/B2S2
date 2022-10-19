import { View, Text, StyleSheet, Dimensions, Image, Pressable } from 'react-native'
import { openSearchDetail } from '../../global/SearchState';
import themes from '../../values/themes';

const littleWidth = Dimensions.get('window').width * 44 / 100;
const littleHeight = Dimensions.get('window').width * 66 / 100;
const allHeight = littleHeight + 100;

const LittleShort = ({ navigation, item }) => {
  const open = () => {
    openSearchDetail();
    navigation.navigate('SearchDetails');
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={open}>
        <Image
          style={styles.poster}
          source={require('../../../tests/Background.png')}
          resizeMode='cover'
        />
      </Pressable>

      <Text style={styles.caption}
        numberOfLines={2}
      >
        #SupaHot Test Data Ley Lospim Neifs To 2 Line 
      </Text>

      <View style={styles.originalPoster}>
        <Image
          style={styles.avatar}
          source={require('../../assets/placeholder/user.png')}
          resizeMode='cover'
        />
        <Text style={styles.opname} numberOfLines={1}>
          Name
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: littleWidth,
    height: allHeight,
    flexDirection: 'column',
    marginHorizontal: '2%',
  },
  poster: {
    height: littleHeight,
    width: littleWidth,
    borderRadius: 8,
  },
  caption: {
    fontWeight: '500',
    color: themes.COLOR,
    fontSize: themes.SIZE,
    marginVertical: 3,
  },
  originalPoster: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  opname: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SIZE,
  }
})

export default LittleShort