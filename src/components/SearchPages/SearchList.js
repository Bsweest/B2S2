import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import LittleShort from '.';
import querySeachShorts from '../../../backend/services/FullTextSearh';
import themes from '../../values/themes';
import InputBar from '../InputBar';

const SearchList = ({ route, navigation }) => {
  const { s_key: text_search } = route.params;

  const ac = new AbortController();

  const { data, error, isSuccess } = querySeachShorts(text_search, ac);

  useEffect(() => {
    return () => {
      ac.abort();
    };
  }, []);

  const renderItem = ({ item }) => {
    return <LittleShort navigation={navigation} item={item} ts={text_search} />;
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputBar
        auto={false}
        prev={goBack}
        init={false}
        placeholder={text_search}
      />

      <View style={styles.body}>
        <FlashList
          data={data}
          estimatedItemSize={6}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          numColumns={2}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  body: {
    flex: 1,
    paddingLeft: '2%',
    marginTop: 5,
  },
});

export default SearchList;
