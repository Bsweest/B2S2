import { useObservable, useSelector } from '@legendapp/state/react';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { mutateProfileField } from '../../../backend/mutation/ProfileMutation';
import { ClientData } from '../../../backend/services/ShareProfileServices';
import themes from '../../values/themes';

const UpdateField = ({ navigation, route }) => {
  const { field } = route.params;
  const { data } = ClientData();
  const upperCase = field.toUpperCase();

  const [maxLength, setMaxLength] = useState(80);
  const [multi, setMulti] = useState(false); // condition of multiline input
  const [old, setOld] = useState(''); // previous value of field you want to change
  const [min, setMin] = useState(false); // condition of constrain for min character length in field
  const [showErrorMin, setShowErrorMin] = useState(false); // condition to show error message for min

  const input = useObservable('');
  const description = useObservable('');

  const length = useSelector(() => input.get().length);
  const condition = useSelector(
    () => !(old === input.get()) && (!min || length >= 5),
  ); // allow to update

  const { mutate, isLoading, isSuccess, status } = mutateProfileField();

  useEffect(() => {
    switch (field) {
      case 'displayname':
        setMaxLength(30);
        input.set(data.displayname);
        setOld(data.displayname);
        setMin(true);
        description.set('The name you want to be called');
        break;

      case 'username':
        setMaxLength(20);
        input.set(data.username);
        setOld(data.username);
        setMin(true);
        description.set('The unique username');
        break;

      case 'bio':
        input.set(data.bio);
        setOld(data.bio);
        setMulti(true);
        description.set('Describe yourself');
        break;
    }
  }, []);

  useEffect(() => {
    switch (status) {
      case 'error':
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Errors occur while changing.',
        });
        return;

      case 'success':
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Change is done.',
        });
        goBack();
        return;
    }
  }, [status]);

  const goBack = () => {
    navigation.goBack();
  };

  const inputChange = (value) => {
    input.set(value);
    if (!min) return;
    if (value.length < 5) setShowErrorMin(true);
    else setShowErrorMin(false);
  };

  const update = () => {
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          const value = input.get();
          mutate({ field: field, value: value, client: data.id });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={goBack}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.field}>{upperCase}</Text>
        </Pressable>
        <Pressable disabled={!condition} onPress={update}>
          <Text
            style={{
              fontSize: themes.SIZE,
              color: condition ? themes.BLUE : themes.CONSTRACT,
            }}
          >
            Update
          </Text>
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.static}>{field}</Text>
        <TextInput
          style={styles.input}
          maxLength={maxLength}
          multiline={multi}
          numberOfLines={multi ? 4 : 1}
          value={input.get()}
          onChangeText={inputChange}
        />
        <Text
          style={[
            styles.description,
            { color: condition ? themes.SECONDCOLOR : 'red' },
          ]}
        >
          {showErrorMin ? 'The field needs more than 5 character' : description}{' '}
          {length}/{maxLength}
        </Text>
      </View>
    </View>
  );
};

export default UpdateField;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  topBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderBottomColor: themes.CONSTRACT,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  cancel: {
    fontSize: themes.SIZE,
    color: themes.COLOR,
  },
  field: {
    fontSize: themes.BIG,
    fontWeight: 'bold',
    color: themes.COLOR,
  },
  bottomContainer: {
    paddingHorizontal: 10,
  },
  static: {
    fontSize: themes.SIZE,
    fontWeight: 'bold',
    color: themes.SECONDCOLOR,
  },
  input: {
    fontSize: themes.SIZE,
    borderBottomColor: themes.CONSTRACT,
    borderBottomWidth: 1,
    color: themes.COLOR,
    marginVertical: 7,
  },
  description: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SIZE,
  },
});
