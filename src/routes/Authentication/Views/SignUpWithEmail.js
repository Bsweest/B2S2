import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FlatButton, TextField } from '../../../components/Auth/Button';
import PressableOpacity from '../../../components/PressableOpacity';

const SignUpWithEmail = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <PressableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrow}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </PressableOpacity>
        <Text style={styles.txtSignUp}>Sign Up with Email</Text>
      </View>
      <View style={styles.midContainer}>
        <TextField placeholder="Email" keyboardType="email-address" />
        <TextField placeholder="Password" secureTextEntry={true} />
        <TextField placeholder="Retype password" secureTextEntry={true} />
        <FlatButton title="Next" />
      </View>
    </View>
  );
};

export default SignUpWithEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 35,
  },
  backArrow: {
    width: '10%',
    paddingLeft: 10,
    alignSelf: 'flex-start',
  },
  txtSignUp: {
    width: '80%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSignUp: {
    marginTop: 500,
  },
  midContainer: {
    flex: 15,
    width: '100%',
    padding: 25,
  },
});
