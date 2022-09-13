import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import FlatButton from '../components/FlatButton'

const LoginWithEmail = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Ionicons style={styles.backArrow} name="arrow-back" size={24} color="black" />
        <Text style={styles.txtSignUp}>Log In with Email</Text>
      </View>
      <View style={styles.midContainer}>
        <TextField  placeholder="Email"
            keyboardType="email-address"/>
        <TextField  placeholder="Password"
            secureTextEntry={true}/>
        <TouchableOpacity style={styles.forgetPw}>
            <Text style={{color:'red',fontWeight:'bold',fontSize:15}}>Forgot password?</Text>
        </TouchableOpacity>
        <FlatButton title="Next"/>
      </View>
    </View>
  )
}

export default LoginWithEmail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
      },
      topContainer: {
        flex: 1,
        flexDirection: 'row',
        width:'100%',
        marginTop:35,
      },
      backArrow:{
        width:'10%',
        paddingLeft:10,
        alignSelf:'flex-start',
      },
      txtSignUp:{
        width:'80%',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
      },
      forgetPw:{
        marginTop:20,
      },
      btnSignUp:{
        marginTop:500,
      },
      midContainer:{
        flex: 15,
        width:'100%',
        padding:25,
      }
})