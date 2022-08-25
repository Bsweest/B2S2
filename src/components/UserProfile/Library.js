import { StyleSheet, Pressable, View, Dimensions, Image } from 'react-native'
import React from 'react'

const itemWidth = Dimensions.get('window').width / 3;
const itemHeight = itemWidth * 1.5;

const Library = ({ item }) => {

  const openVideoModal = () => {

  }
    
  return (
    <View style={styles.container}>
      <Pressable onPress={openVideoModal}>
        <Image
          resizeMode='contain'
          source={require('../../../tests/Background.png')}
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
    marginVertical: 1,
  }
})