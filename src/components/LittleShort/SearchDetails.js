import { StyleSheet, View, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import ListShort from '../ShareShort/ListShort'

import { Ionicons } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

const SearchDetails = ({ navigation }) => {
  const { data } =  useSelector(state => state.searchDetails);
  
  const goBack = () => {
    navigation.navigate('SearchResults');
  }

  useLayoutEffect(() => {
    
  
    return () => {
      
    };
  }, [])

  return (
    <View style={styles.container}>
      <ListShort style={styles.flist} isMain={false} data={data}/>

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
  },
  btnBack: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 50,
  },
  flist: {
    zIndex: 0,
  }
})

export default SearchDetails