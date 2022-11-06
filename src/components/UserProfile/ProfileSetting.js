import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { updateAvatar } from '../../../backend/mutation/ProfileMutation';
import { ClientData } from '../../../backend/services/ShareProfileServices';
import themes from '../../values/themes';
import TopBarClient from './TopBar/TopBarClient';

const ProfileSetting = ({ navigation }) => {
  const { data } = ClientData();
  const [image, setImage] = useState();

  useEffect(() => {
    if (data) setImage(data.avatar_url);
  }, [data.avatar_url]);

  const goBack = () => {
    navigation.goBack();
  };

  const goToUpdate = (field) => {
    navigation.navigate('UpdateField', {
      field: field,
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      var form = new FormData();
      const isAdd = !data.avatar_url;
      form.append('files', {
        uri: result.uri,
        type: 'image/png',
        name: `${data.id}.png`,
      });
      const bool = await updateAvatar(data.id, form, isAdd);
      if (bool) {
        setImage(result.uri);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your Avatar will change next time you login',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to change the Avatar.',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TopBarClient
        goBack={goBack}
        displayname="Update Profile"
        isScene={false}
      />
      <View style={styles.avatarContainer}>
        <Pressable onPress={pickImage}>
          <Image
            style={styles.avatar}
            source={
              image
                ? { uri: image }
                : require('../../assets/placeholder/user.png')
            }
          />
        </Pressable>
        <Ionicons name="camera-outline" size={20} color={themes.COLOR} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.static}>{}</Text>
        <View style={styles.row}>
          <Text style={styles.text}>B2S2 ID</Text>
          <Pressable onPress={() => goToUpdate('username')}>
            <Text style={styles.text}>
              {data.username}
              <AntDesign
                style={styles.caret}
                name="right"
                size={15}
                color="white"
              />
            </Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>DisplayName</Text>
          <Pressable onPress={() => goToUpdate('displayname')}>
            <Text style={styles.text}>
              {data.displayname}
              <AntDesign
                style={styles.caret}
                name="right"
                size={15}
                color="white"
              />
            </Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Link</Text>
          <Text style={styles.text}>{}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Bio</Text>
          <Pressable onPress={() => goToUpdate('bio')}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {data.bio}
              <AntDesign
                style={styles.caret}
                name="right"
                size={15}
                color="white"
              />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  avatar: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -40,
    left: -50,
    opacity: 0.9,
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  static: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
  },
  text: {
    color: themes.COLOR,
    fontSize: themes.BIG,
    maxWidth: 200,
  },
  caret: {
    marginLeft: 3,
  },
});
