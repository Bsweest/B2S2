import { useObservable } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import Constants from 'expo-constants';
import { useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { View } from 'react-native';

import ShortVideo from '.';

const windowHeight = Dimensions.get('window').height;

const ListShort = ({ data, navigation, initialIndex }) => {
  const focusedIndex = useObservable(0);
  const VIDEOHEIGHT = windowHeight - Constants.statusBarHeight - 45;

  const renderItem = ({ item, index }) => {
    return (
      <ShortVideo
        item={item}
        navigation={navigation}
        VIDEOHEIGHT={VIDEOHEIGHT}
        focusedIndex={focusedIndex}
        index={index}
      />
    );
  };

  const handleScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { y },
      },
    }) => {
      const offset = Math.round(y / VIDEOHEIGHT);

      if (offset !== focusedIndex.get()) focusedIndex.set(offset);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        onScroll={handleScroll}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        estimatedFirstItemOffset={(initialIndex + 1) * VIDEOHEIGHT}
        initialScrollIndex={initialIndex}
        decelerationRate={'normal'}
        ListFooterComponent={footer}
      />
    </View>
  );
};

const footer = () => {
  <View style={styles.footer}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 50,
    backgroundColor: 'black',
  },
});

export default ListShort;
