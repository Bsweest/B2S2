import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from '../../../components/Auth/Button';
import PressableOpacity from '../../../components/PressableOpacity';

const LogIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.form}>
          <Text style={styles.topText}>Log In to B2S2</Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              marginBottom: 25,
              color: 'gray',
            }}
          >
            Manage your account, check notifications, comment on videos, and
            more
          </Text>

          <IconButton
            onClick={() => navigation.navigate('LoginWithEmail')}
            title="User Email"
            bgColor="white"
            iconname="user"
          />

          <IconButton
            title="Continue with Facebook"
            bgColor="white"
            iconname="facebook"
          />
          <IconButton
            title="Continue with Twitter"
            bgColor="white"
            iconname="twitter"
          />
          <IconButton
            title="Continue with Instagram"
            bgColor="white"
            iconname="instagram"
          />
          <IconButton
            title="Continue with Google"
            bgColor="white"
            iconname="google"
          />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text>Don't have an account?</Text>
        <PressableOpacity>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.btnLogin}
          >
            Sign Up
          </Text>
        </PressableOpacity>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    flex: 1,
    width: '100%',
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 1,
    fontSize: 25,
  },
  bottomContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  btnLogin: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
