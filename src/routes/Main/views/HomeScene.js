import { View, StyleSheet } from 'react-native';

import ListShort from '../../../components/ShareShort/ListShort'
import ShareProfile from '../../../components/UserProfile/ShareProfile';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import getExplore from '../../../../backend/services/GetNewFeed'

const HomeStack = createNativeStackNavigator();

export default function HomeScene() {
  return (
    <View style={styles.container}>
      <HomeStack.Navigator
        initialRouteName='NewFeed'
        screenOptions={{
          headerShown: false,
        }}
      >
        <HomeStack.Screen name='NewFeed' component={NewFeed}/>
        <HomeStack.Screen name='ShareProfile' component={ShareProfile}/>
      </HomeStack.Navigator>
    </View>
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
    <View style={styles.container}>
      {data ?
        <ListShort data={data} navigation={navigation}/>
        :
        <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

