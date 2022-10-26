import { StyleSheet, View, Pressable, Text } from 'react-native'
import React from 'react'
import ListShort from '../ShareShort/ListShort'

import { Ionicons } from '@expo/vector-icons'; 

import { useQuery } from '@tanstack/react-query';
import { getShortsOfUser } from '../../../backend/services/ShareProfileServices';
import themes from '../../values/themes';
import { captionSearch } from '../../../backend/services/FullTextSearh';

const SearchDetails = ({ navigation, route }) => {
  const { op_id, initialIndex, detailBox, text_search } = route.params;

  const ac = new AbortController();

  const { data, isSuccess } = op_id ? 
  useQuery(
    ['get_user_shorts', op_id],
    () => getShortsOfUser(op_id)
  )
  :
  useQuery(
    ['search_caption', text_search],
    () => captionSearch(text_search, ac)
  )

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Pressable style={styles.btnBack} onPress={goBack}>
          <Ionicons 
            name="arrow-back-outline" 
            size={30} color="white" 
          />
        </Pressable>
        <Text style={styles.detailBox}>
          {detailBox}
        </Text>
      </View>

      {isSuccess ?
        <ListShort 
          style={styles.listshorts} 
          data={data} navigation={navigation}
          initialIndex={initialIndex}  
        />
        :
        <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 20,
  },
  topPart: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: themes.BACKGROUND,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: themes.CONSTRACT
  },
  btnBack: {
    marginHorizontal: 10,
  },
  detailBox: {
    fontSize: themes.SIZE,
    color: themes.COLOR,
    flex: 1,
    padding: 3,
    marginRight: 10,
    backgroundColor: themes.TRANSPARENT,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: themes.CONSTRACT
  },
  listshorts: {
    zIndex: 0,
  }
})

export default SearchDetails