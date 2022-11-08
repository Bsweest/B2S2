import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  queryLikedShorts,
  queryMarkedShorts,
  queryShortsOfUser,
} from '../../../../backend/services/ShareProfileServices';
import themes from '../../../values/themes';
import Library from '../Library';

const GroupShort = ({ navigation, route }) => {
  const { fetch, op_id } = route.params;
  const { data, isSuccess } =
    fetch === 'all'
      ? queryShortsOfUser(op_id)
      : fetch === 'heart'
      ? queryLikedShorts(op_id)
      : fetch === 'bookmark'
      ? queryMarkedShorts(op_id)
      : null;

  const renderItem = ({ item, index }) => {
    return <Library data={item} navigation={navigation} index={index} />;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={100}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 1,
  },
});

export default GroupShort;
