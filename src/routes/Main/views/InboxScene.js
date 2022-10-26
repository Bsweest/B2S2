import { StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MessList from '../../../components/Chat/MessList'
import ChatScreen from '../../../components/Chat/ChatScreen'

const InboxStack = createNativeStackNavigator();

const InboxScene = () => {

  return (
    <View style={styles.container}>
      <InboxStack.Navigator
        initialRouteName='MessList'
        screenOptions={{
          headerShown: false,
        }}
      >
        <InboxStack.Screen name='MessList' component={MessList}/>
        <InboxStack.Screen name='ChatScreen' component={ChatScreen}/>
      </InboxStack.Navigator>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default InboxScene
