import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import themes from '../../../values/themes';

const TopBarClient = ({ displayname, goBack, isScene }) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.nickname}>{displayname}</Text>

      <View style={styles.buttons}>
        {!isScene && (
          <Pressable onPress={goBack}>
            <Ionicons
              name="ios-arrow-back"
              size={30}
              color="white"
              style={styles.btnAll}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default TopBarClient;

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: themes.BIG,
    color: themes.COLOR,
  },
  buttons: {
    position: 'absolute',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAll: {
    marginHorizontal: 10,
  },
});
