import { StyleSheet, Image, View, Pressable, Text } from 'react-native'
import React, { useState } from 'react'
import { Motion } from '@legendapp/motion'
import { FlashList } from '@shopify/flash-list'

import themes from '../../values/themes'
import Library from './Library'

const UserProfile = ({ navigation }) => {
  const [follow, setFollow] = useState(false);

  const data=[0, 10, 2, 4, 5]

  const updateFollow = () => {
    setFollow(prev => !prev);
  }

  const renderItem = ({ item }) => {
    return (
      <Library item={item} navigation={navigation}/>
    )
  }

  const header = () => {
    return (
      <View style={styles.topContainer}>

        <Image
          style={styles.avatar}
          source={require('../../assets/placeholder/user.png')}
        />

        <Text style={styles.username}>
          @Follower
        </Text>

        <View style={styles.statisticsContainer}>
          <View style={styles.boxSide}>
            <Text style={styles.number}>100</Text>
            <Text style={styles.note}>Following</Text>
          </View>
          <View style={styles.boxMain}>
            <Text style={styles.number}>5.4M</Text>
            <Text style={styles.note}>Followed</Text>
          </View>
          <View style={styles.boxSide}>
            <Text style={styles.number}>10.4M</Text>
            <Text style={styles.note}>Heart</Text>
          </View>
        </View>

        <Motion.Pressable onPress={updateFollow}>
          <Motion.View
            style={styles.btnFollow}
            animate={{
              backgroundColor: follow ? themes.COLOR : '#EA4359',
            }}
            transition={{
              type: 'tween',
              duration: 1000,
            }}
          >
            <Motion.Text
             style={styles.textOfBtn}
              animate={{
                color: follow ? '#EA4359' : themes.COLOR,
              }}
            >
              {follow ? 'Followed' : 'Follow'}
            </Motion.Text>  
          </Motion.View>
        </Motion.Pressable>

        <Text style={styles.bio}>
          Bio of Temporary
        </Text>

      </View>
    )
  }

  return (
    <Motion.View style={styles.container}>
      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item)=>item}
        numColumns={3}
        ListHeaderComponent={header}
      />
    </Motion.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.BACKGROUND,
  },
  topContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: themes.SIZE,
    color: themes.ACTIVE,
  },
  statisticsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
    marginVertical: 10,
  },
  boxMain: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: themes.ACTIVE,
  },
  boxSide: {
    alignItems: 'center',
  },
  number: {
    color: themes.COLOR,
    fontWeight: 'bold',
    fontSize: themes.BIG,
  },
  note: {
    color: themes.COLOR,
    fontWeight: '300',
    fontSize: themes.SIZE,
  },
  btnFollow: {
    borderRadius: 10,
    width: 150,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textOfBtn: {
    fontSize: themes.BIG,
    fontWeight: 'bold',
  },
  bio: {
    color: themes.COLOR,
    fontSize: themes.SIZE,
    margin: 15,
  },
})

export default UserProfile