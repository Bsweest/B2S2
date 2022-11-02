import { StyleSheet, Text, View, Pressable } from 'react-native'
import themes from '../../../values/themes'

import { Ionicons } from '@expo/vector-icons'; 

const TopBarShare = ({ displayname, goBack }) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.nickname}>
        {displayname}
      </Text>

      <View style={styles.buttons}>
        <Pressable onPress={goBack}>
          <Ionicons name="ios-arrow-back"
            size={30} color="white"
            style={styles.btnAll}
          />
        </Pressable>

        <Pressable>
          <Ionicons name="chatbubbles-sharp" 
            size={25} color="white"
            style={styles.btnAll}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default TopBarShare

const styles = StyleSheet.create({
  topBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: themes.BIG,
    color: themes.COLOR,
  },
  buttons: {
    position: 'absolute',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnAll: {
    marginHorizontal: 10,
  },
})