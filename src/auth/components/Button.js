import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


const Button =(props) => {
  return (
    <TouchableOpacity style={[styles.button]} {...props}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default Button
const styles = StyleSheet.create({
  button: {
    borderColor: '#8CC33F',
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: '#8CC33F',
    fontSize: 18,
  },
});
