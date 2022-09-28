import ListShort from '../../../components/ShareShort/ListShort'
import ShareProfile from '../../../components/UserProfile/ShareProfile';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getExplore from '../../../services/GetNewFeed';

const HomeStack = createNativeStackNavigator();

export default function HomeScene() {
  return (
    <>
      <HomeStack.Navigator
        initialRouteName='NewFeed'
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name='NewFeed' component={NewFeed}/>
        <HomeStack.Screen name='ShareProfile' component={ShareProfile}/>
      </HomeStack.Navigator>
    </>
  )
}

const NewFeed = ({ navigation }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getExplore().then((rs) => {
      setData(rs);
    })
  }, [])
  

  return (
    <>
      {data ?
        <ListShort data={data} navigation={navigation}/>
        :
        <></>
      }
    </>
  )
}

