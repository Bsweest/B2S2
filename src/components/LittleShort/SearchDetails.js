import { StyleSheet, View, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import ShortVideo from '../ShareShort'

import { Ionicons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

const SearchDetails = ({ navigation }) => {
  const { data } =  useSelector(state => state.searchDetails);

  useEffect(() => {
    console.log('data', data)
  
    return () => {
      console.log('Out')
    }
  }, [])
  
  
  return (
    <View style={styles.container}>
      <ShortVideo style={styles.video} item={data}/>

      <Pressable style={styles.btnBack} onPress={()=>navigation.navigate('SearchResults')}>
        <Ionicons 
          name="arrow-back-outline" 
          size={40} color="white" 
        />
      </Pressable>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnBack: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 50,
  },
  video: {
    zIndex: 0,
  }
})

export default SearchDetails