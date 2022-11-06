import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import themes from '../../values/themes';

const InputBar = ({ next, prev, auto, init, placeholder, searchFriend }) => {
  const input = useRef();
  const [value, setValue] = useState('');

  const cancel = () => {
    input.current.clear();
  };
  const letSearch = () => {
    if (value) next(value);
  };

  useEffect(() => {
    if (!searchFriend) return;
    const timeout = setTimeout(() => {
      if (value) searchFriend(value);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <View style={styles.searchContainer}>
      {!init && (
        <Pressable onPress={prev}>
          <MaterialIcons
            name="arrow-back"
            size={30}
            color={themes.SECONDCOLOR}
          />
        </Pressable>
      )}
      <View style={styles.inputContainer}>
        {auto ? (
          <>
            <TextInput
              ref={input}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor={themes.SECONDCOLOR}
              multiline={false}
              onChangeText={setValue}
              onSubmitEditing={letSearch}
              autoFocus={auto}
            />
            <Pressable style={styles.cancel} onPress={cancel}>
              <MaterialIcons
                name="cancel"
                size={25}
                color={themes.SECONDCOLOR}
              />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={next}>
              <Text style={styles.placeHolder}>{placeholder}</Text>
            </Pressable>
            <View style={{ height: 28 }} />
          </>
        )}
      </View>
    </View>
  );
};

export default InputBar;

const styles = StyleSheet.create({
  searchContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 10,
    backgroundColor: themes.BACKGROUND,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 3,
    paddingLeft: 15,
    paddingRight: 10,
    marginRight: 15,
    backgroundColor: themes.CONSTRACT,
    color: themes.COLOR,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontSize: themes.SIZE,
    color: themes.COLOR,
    flex: 1,
  },
  placeHolder: {
    fontSize: themes.SIZE,
    color: themes.SECONDCOLOR,
  },
  cancel: {
    width: 25,
    alignItems: 'center',
  },
});
