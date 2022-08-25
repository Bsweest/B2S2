import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MessList from '../../../components/Chat/MessList'
import ChatScreen from '../../../components/Chat/ChatScreen'

const InboxStack = createNativeStackNavigator();

const InboxScene = () => {

  return (
    <SafeAreaView style={styles.container}>

      <InboxStack.Navigator
        initialRouteName='MessList'
        screenOptions={{
          headerShown: false,
        }}
      >
        <InboxStack.Screen name='MessList' component={MessList}/>
        <InboxStack.Screen name='ChatScreen' component={ChatScreen}/>
      </InboxStack.Navigator>
      
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default InboxScene
