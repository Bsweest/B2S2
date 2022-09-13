import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const OTPCodeInput = () => {
  return (
    <View style={styles.box}>
      <TextInput keyboardType='numeric' style={styles.codeInput}/>
    </View>
  )
}

export default OTPCodeInput

const styles = StyleSheet.create({
    codeInput:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    box:{
        justifyContent:'space-evenly',
        flexDirection:'row',
        width:40,
        height:50,
        borderBottomColor:'black',
        borderBottomWidth:0.5,
        borderRadius:5,
    }
})