import { View, StyleSheet } from 'react-native'
import themes from '../../../values/themes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchTrend from '../../../components/SearchPages/SearchTrend';
import SearchList from '../../../components/SearchPages/SearchList'
import SearchDetails from '../../../components/SearchPages/SearchDetails'
import SearchInput from '../../../components/SearchPages/SearchInput'

const NavStack = createNativeStackNavigator();

export default function SearchScene() {
  return (
    <View style={styles.container}>
      <NavStack.Navigator 
        initialRouteName='SearchTrend'
        screenOptions={{
          headerShown: false,
        }}
      >
        <NavStack.Screen name='SearchTrend' component={SearchTrend}/>
        <NavStack.Screen name='SearchInput' component={SearchInput}/>
        <NavStack.Screen name='SearchResults' component={SearchList}/>
        <NavStack.Screen name='SearchDetails' component={SearchDetails}/>
      </NavStack.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    zIndex: 0,
  },
  searchContainer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingLeft: 15,
    backgroundColor: themes.BACKGROUND,
    borderBottomColor: themes.ACTIVE,
    borderBottomWidth: 0.5,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 15,
    backgroundColor: themes.CONSTRACT,
    color: themes.COLOR,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: themes.SIZE,
    color: themes.COLOR
  },
  cancel: {
    width: 30,
    alignItems: 'center',
  }
})