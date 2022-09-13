import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import FlatButton from '../components/FlatButton'
import OTPCodeInput from '../components/OTPCodeInput';
import RoundedButton from '../components/RoundedButton';

const OTPCode = () => {
  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Ionicons style={styles.backArrow} name="arrow-back" size={24} color="black" />
        </View>
        <View style={styles.topText}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Enter Code</Text>
            <Text style={{fontSize:15,color:'gray'}}>Your code was emailed to aaa@gmail.com</Text>
        </View>
        <View style={styles.midContainer}>
            <OTPCodeInput/>
            <OTPCodeInput/>
            <OTPCodeInput/>
            <OTPCodeInput/>
            <OTPCodeInput/>
            <OTPCodeInput/>
      </View>
        <View style={styles.botContainer}>
            <RoundedButton iconName = 'arrowright' iconColor='white'/>
        </View>
    </View>
  )
}

export default OTPCode

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
    topText:{
        width:'100%',
        paddingLeft:25
    },
    midContainer:{
        flex: 1,
        flexDirection:'row',
        width:'100%',
        padding:25,
        justifyContent:'space-between',
    },
    botContainer:{
        flex:14,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:30,
        alignItems:'center'
    }
})