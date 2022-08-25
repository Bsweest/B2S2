import { StyleSheet, Image, View, Pressable } from 'react-native'
import React from 'react'
import { Motion } from '@legendapp/motion'
import { FlashList } from '@shopify/flash-list'

import themes from '../../values/themes'
import Library from './Library'

const UserProfile = () => {
  const [follow, setFollow] = useState(false);

  const data=[0, 10, 2, 4, 5]

  const updateFollow = () => {
    if(follow) setFollow(false);
    else setFollow(true);
  }

  const renderItem = ({ item }) => {
    return (
      <Library item={item}/>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>

        <Image
          style={styles.avatar}
          source={require('../../assets/placeholder/user.png')}
        />

        <Text style={styles.username}>
          @Follower
        </Text>

        <View style={styles.statisticsContainer}>
          <View style={styles.box}>
            <Text style={styles.number}>100</Text>
            <Text style={styles.note}>Following</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.number}>5.4M</Text>
            <Text style={styles.note}>Followed</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.number}>10.4M</Text>
            <Text style={styles.note}>Heart</Text>
          </View>
        </View>

        <Motion.Pressable onPress={updateFollow}>
          <Motion.Text
            style={styles.btnFollow}
            animate={{
              color: follow ? '#3DCA76' : themes.COLOR,
              backgroundColor: follow ? themes.COLOR : '#3DCA76',
            }}
            transition={{
              type: 'tween',
              duration: 600,
            }}
          >
            {follow ? 'Follow' : 'Followed'}
          </Motion.Text>  
        </Motion.Pressable>

        <Text>
          Bio of Temporary
        </Text>

      </View>

      <FlashList
        data={data}
        estimatedItemSize={20}
        renderItem={renderItem}
        keyExtractor={(item)=>item}
        numColumns={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username: {
    fontSize: themes.SIZE,
    color: themes.ACTIVE,
  },
  statisticsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center'
  },
  number: {
    fontWeight: 'bold',
    fontSize: themes.BIG,
  },
  note: {
    fontWeight: '200',
    fontSize: themes.SIZE,
  },
  btnFollow: {
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bio: {
    fontSize: themes.SIZE,
    marginHorizontal: 30,
  },
  list: {
    flex: 1,
  }
})

export default UserProfile