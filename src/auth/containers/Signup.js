import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextField from '../components/TextField'
import IconButton from '../components/IconButton'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 


const SignUp = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Ionicons style={styles.topItem} name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.form}>
          <Text style={styles.topText}>Sign Up for Tiktok</Text>
          <Text style={{
            fontSize:15, 
            textAlign: 'center', 
            marginBottom: 25,
            color: 'gray'}}>
              Create a profile, follow other accounts, make your own videos, and more
          </Text>

          <IconButton
            click = {() => navigation.navigate('SignUpWithEmail')}
            title='User Email'
            bgColor='white'
            iconname='user'
          />

          {/*  */}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            <View>
              <Text style={{width: 40, textAlign: 'center',fontWeight:'bold',color:'gray'}}>Or</Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
          <IconButton
            title='Continue with Facebook'
            bgColor='white'
            iconname='facebook'
          />
          <IconButton
            title='Continue with Twitter'
            bgColor='white'
            iconname='twitter'
          />
          <IconButton
            title='Continue with Instagram'
            bgColor='white'
            iconname='instagram'
          />
          <IconButton
            title='Continue with Google'
            bgColor='white'
            iconname='google'
          />    
        </View>
      </View>
      
      <View style={styles.bottomContainer}>
          <Text>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.btnLogin}>Log In</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  topContainer: {
    flex: 1,
    width:'100%',

  },
  form: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
  },
  topItem: {
    paddingLeft: 10,
    paddingTop: 30,
  },
  topText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10
  },
  button:{
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 1,
    fontSize: 25
  },
  bottomContainer: {
    height: 50,
    width:'100%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'whitesmoke'
  },
  btnLogin:{
    marginLeft:10,
    color:'red',
    fontWeight:'bold'
  }
})