import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AuthLayout from '../components/AuthLayout'
import TextField from '../components/TextField'
import Button from '../components/Button'

const Signup = () => {
  return (
    <AuthLayout title="Sign Up" showBackButton>
      <View style={styles.form}>
        <TextField
          placeholder="Name"
          
        />
        <TextField
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextField
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextField
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        <Button title="Sign Up" />
        <Button title="Log In" />
      </View>
    </AuthLayout>
  )
}

export default Signup

const styles = StyleSheet.create({
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
  },
  navItemContainer: {
    marginTop: 35,
    marginBottom: 35,
    alignSelf: 'center',
  },
  navItemText: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Poppins-Medium',
  },
})