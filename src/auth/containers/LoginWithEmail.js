import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextField from '../components/TextField'
import Button from '../components/IconButton'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import FlatButton from '../components/FlatButton'


const LoginWithEmail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')} style={styles.backArrow}>
          <Ionicons  name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtSignUp}>Log In with Email</Text>
      </View>
      <View style={styles.midContainer}>
        <TextField  placeholder="Email"
            keyboardType="email-address"/>
        <TextField  placeholder="Password"
            secureTextEntry={true}/>
        <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')} style={styles.forgetPw}>
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