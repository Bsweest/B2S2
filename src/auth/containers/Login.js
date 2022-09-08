import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthLayout from '../components/AuthLayout'
import Button from '../components/Button'
import TextField from '../components/TextField'

const Login = () => {
  return (
    <AuthLayout title="Log In" showBackButton>
        <View style={styles.form}>
            <TextField
            placeholder="Email"
            keyboardType="email-address"
            />
            <TextField
            placeholder="Password"
            secureTextEntry={true}
            />
            <Button title = 'Log In'/>
            <Button title = 'Sign Up'/>

            <View
            underlayColor="#f0f4f7"
            style={styles.navItemContainer}>
            <Text style={styles.navItemText}>Forgot password ?</Text>
            </View>
        </View>
    </AuthLayout>
  )
}

export default Login

const styles = StyleSheet.create({
    form: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 25,
      },
      navItemContainer: {
        marginTop: 35,
        alignSelf: 'center',
      },
      navItemText: {
        fontSize: 18,
        color: '#696969',
      }
})