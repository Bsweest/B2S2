import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Button =(props) => {
  const { title, bgColor } = props;

  return (
    <TouchableOpacity>
      <View style={[styles.container, {backgroundColor:bgColor}]}>
        <View>
          <Text style={styles.buttonText}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default Button
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});
