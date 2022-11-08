import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const TextField = (props) => {
  const [border, setBorder] = useState('#707070');
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        {...props}
        placeholderTextColor="#696969"
        style={[styles.textInput, { borderColor: border }]}
        onFocus={() => setBorder('black')}
        onBlur={() => setBorder('#696969')}
      />
      {props.icon && <Image source={props.icon} style={styles.icon} />}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    color: '#696969',
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontSize: 16,
    paddingTop: 45,
  },
  icon: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
});
