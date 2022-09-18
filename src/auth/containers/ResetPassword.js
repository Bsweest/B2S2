import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextField from '../components/TextField'
import Button from '../components/IconButton'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import FlatButton from '../components/FlatButton'

const ResetPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('OTPCode')} style={styles.backArrow}>
          <Ionicons  name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.midContainer}>
        <View style={styles.topText}>
          <Text style={{fontSize:25,fontWeight:'bold'}}>Create Password</Text>
          <Text style={{fontSize:15,color:'gray'}}>Use 8-20 characters from at least 2 categories: letters, numbers, special characters</Text>
        </View>
        <TextField placeholder='Password'/>
        <FlatButton title="Next"/>
      </View>
    </View>
  )
}

export default ResetPassword

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
  btnSignUp:{
    marginTop:500,
  },
  midContainer:{
    flex: 15,
    width:'100%',
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:25
  },
  topText:{
    alignSelf:'flex-start'
  }
})