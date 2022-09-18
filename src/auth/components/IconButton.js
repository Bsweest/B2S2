import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const test = () =>{
  console.log('hhhh')
}
const IconButton =(props) => {
  const { iconname, title, bgColor } = props;
  return (
    <Pressable onPress={props.click}>
      <View  style={styles.container}>
        <View>
          <Text style={styles.buttonText}>
            {title}
          </Text>
        </View>

        <FontAwesome5 style={styles.icon} name={iconname} size={24} color="black" />
      </View>
    </Pressable>
  );
};
export default IconButton
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  icon:{
    marginLeft: 10,
    marginRight: 10,
    left: 0,
    position: 'absolute',
  }
});