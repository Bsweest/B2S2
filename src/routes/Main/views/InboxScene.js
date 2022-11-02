import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import ChatScreen from '../../../components/Chat/ChatScreen';
import MessList from '../../../components/Chat/MessList';

const InboxStack = createNativeStackNavigator();

const InboxScene = () => {
  return (
    <View style={styles.container}>
      <InboxStack.Navigator
        initialRouteName="MessList"
        screenOptions={{
          headerShown: false,
        }}
      >
        <InboxStack.Screen name="MessList" component={MessList} />
        <InboxStack.Screen name="ChatScreen" component={ChatScreen} />
      </InboxStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default InboxScene;
