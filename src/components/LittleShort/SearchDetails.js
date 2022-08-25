import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import ShortVideo from '../ShareShort'
import { useDispatch, useSelector } from 'react-redux';

import { removeSearchDetails } from '../../redux/slices/SearchDetailsSlice';

import { Ionicons } from '@expo/vector-icons'; 


const SearchDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data } =  useSelector(state => state.searchDetails);

  const goBack = () => {
    dispatch(removeSearchDetails());
    navigation.goBack();
  }
  
  return (
    <View style={styles.container}>
      <ShortVideo style={styles.video} item={data}/>

      <Pressable style={styles.btnBack} onPress={goBack}>
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
    zIndex: 20,
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