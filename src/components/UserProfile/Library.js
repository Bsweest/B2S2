import { StyleSheet, Pressable, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { getSearchDetails } from '../../redux/slices/SearchDetailsSlice';

const itemWidth = Dimensions.get('window').width / 3;
const itemHeight = Dimensions.get('window').width / 2;

const Library = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const openVideoModal = () => {
    dispatch(getSearchDetails(item));
    navigation.navigate('UserShort');
  }
    
  return (
    <View style={styles.container}>
      <Pressable onPress={openVideoModal}>
        <Image
          resizeMode='cover'
          source={require('../../../tests/Background.png')}
          style={styles.image}
        />
      </Pressable>
    </View>
  )
}

export default Library

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemHeight,
  },
  image: {
    width: itemWidth - 2,
    height: itemHeight - 3,
  }
})