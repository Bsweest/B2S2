import { observable } from '@legendapp/state';
import { For } from '@legendapp/state/react';
import { StyleSheet, Text, View } from 'react-native';

// import searchKeys from '../../assets/persist_storage/SearchKeywords';
import themes from '../../values/themes';
import InputBar from '../InputBar';

const searchKeys = observable([
  {
    id: 1,
    history: 'what',
  },
  {
    id: 2,
    history: 'is',
  },
  {
    id: 3,
    history: 'that',
  },
]);

const SearchInput = ({ navigation }) => {
  const goToResults = (value) => {
    navigation.navigate('SearchResults', {
      s_key: value,
    });
  };
  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    return <Text style={styles.keys}>{item.history}</Text>;
  };

  return (
    <View style={styles.container}>
      <InputBar
        next={goToResults}
        prev={goBack}
        auto={true}
        init={false}
        placeholder="Search Shorts..."
      />

      <Text style={styles.header}>Your Search Histories</Text>
      <For each={searchKeys} item={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  header: {
    fontSize: themes.BIG,
    color: themes.SECONDCOLOR,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  keys: {
    fontSize: themes.SIZE,
    color: themes.ACTIVE,
  },
});

export default SearchInput;
