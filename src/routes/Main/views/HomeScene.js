import ListShort from '../../../components/ShareShort/ListShort'
import ShareProfile from '../../../components/UserProfile/ShareProfile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();

export default function HomeScene() {
  return (
    <HomeStack.Navigator
      initialRouteName='NewFeed'
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name='NewFeed' component={NewFeed}/>
      <HomeStack.Screen name='ShareProfile' component={ShareProfile}/>
    </HomeStack.Navigator>
  )
}

const NewFeed = ({ navigation }) => {
  const data = [10, 9, 8, 3];

  return (
    <ListShort data={data} navigation={navigation}/>
  )
}

