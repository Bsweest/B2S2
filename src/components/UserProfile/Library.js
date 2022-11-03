import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

const itemWidth = Dimensions.get('window').width / 3;
const itemHeight = Dimensions.get('window').width / 2;

const Library = ({ data, navigation, index }) => {
  const { poster_uri, op_id } = data;

  const openVideoModal = () => {
    navigation.navigate('UserShort', {
      op_id: op_id,
      initialIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openVideoModal}>
        <Image
          resizeMode="cover"
          source={
            poster_uri
              ? { uri: poster_uri }
              : require('../../assets/placeholder/background.png')
          }
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    height: itemHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: itemWidth - 2,
    height: itemHeight - 3,
  },
});
