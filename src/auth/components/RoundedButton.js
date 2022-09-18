import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 


const RoundedButton = (props) => {
    const { iconName, iconColor } = props;
  return (
    <TouchableOpacity onPress={props.click} style={styles.roundedButton}>
        <AntDesign name={iconName} size={24} color={iconColor} />
    </TouchableOpacity>
  )
}

export default RoundedButton

const styles = StyleSheet.create({
    roundedButton:{
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'pink',
        borderRadius:50,
    }
})