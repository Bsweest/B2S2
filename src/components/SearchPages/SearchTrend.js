import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import InputBar from '../../components/InputBar';
import themes from '../../values/themes';

const SearchTrend = ({ navigation }) => {
  const goToInput = () => {
    navigation.navigate('SearchInput');
  };
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <InputBar
        next={goToInput}
        prev={goBack}
        auto={false}
        init={true}
        placeholder="Search Shorts..."
      />
      <Text style={styles.header}>Popular key searches</Text>
    </View>
  );
};

export default SearchTrend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  header: {
    fontSize: themes.SIZE,
    color: themes.ACTIVE,
    paddingLeft: 15,
  },
});
