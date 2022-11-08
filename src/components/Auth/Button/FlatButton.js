import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PressableOpacity from '../../PressableOpacity';

const Button = (props) => {
  const { title, bgColor, onClick } = props;

  return (
    <PressableOpacity onPress={onClick}>
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </View>
    </PressableOpacity>
  );
};
export default Button;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});
