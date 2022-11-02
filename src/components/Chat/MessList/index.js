import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { getChatRooms } from '../../../../backend/services/ChatServices';
import themes from '../../../values/themes';
import InputBar from '../../InputBar';
import Messenger from './Messenger';

const MessList = ({ navigation }) => {
  const { data, isSuccess, isFetch } = useQuery(['mess_list'], getChatRooms);

  const renderItem = ({ item }) => {
    return <Messenger passID={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <InputBar auto={false} init={true} placeholder="Search Friend..." />

      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  searchContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 15,
    backgroundColor: themes.BACKGROUND,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 15,
    backgroundColor: themes.CONSTRACT,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: themes.SIZE,
    color: themes.COLOR,
  },
  cancel: {
    width: 30,
    alignItems: 'center',
  },
});

export default MessList;
