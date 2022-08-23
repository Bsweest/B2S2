import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRef, useState, useEffect } from 'react'
import LottieView from 'lottie-react-native'

import ReadMore from '@fawazahmed/react-native-read-more'

import themes from '../../values/themes'

const Comment = ({isParent}) => {
  const lottie = useRef(null);
  const [heart, setHeart] = useState({
    isLike: false,
    countHeart: 700,
  });

  const firstLoad = useRef(true);
  const isFinish = useRef(false);

  useEffect(() => {
    if(heart.isLike){
      isFinish.current = false;
      lottie.current.play(0, 65);
      
      if(!firstLoad.current) {
        setHeart(prev => ({...prev, countHeart: prev.countHeart+1}));
      }
    }
    else{
      isFinish.current = false;
      lottie.current.play(100, 115);

      if(!firstLoad.current) {
        setHeart(prev => ({...prev, countHeart: prev.countHeart-1}));
      }
    }

    firstLoad.current = false;
  }, [heart.isLike])

  const updateHeart = () => {
    if(!isFinish.current) return;
    setHeart(prev => ({...prev, isLike: !prev.isLike}));
  }

  return (
    <View style={styles.container}>

      <View style={[styles.avatarContainer, {
        width: isParent ? 50 : 40,
      }]}>
        <Image 
          style={[styles.avatar, {
            height: isParent ? 40 : 30,
            width: isParent ? 40 : 30,
            borderRadius: isParent ? 20 : 15,
          }]}
          source={require('../../assets/placeholder/user.png')}
        /> 
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commenter}>Nguoi Dung</Text>
        <ReadMore 
          style={styles.content}
          numberOfLines={2}
          seeLessStyle={styles.readMore}
          seeMoreStyle={styles.readMore}
        >
          Content Comment
          Hang 2 Hang 3 Dang 4 Dang 5
        </ReadMore>
      </View>

      <View style={styles.heartContainer}>
        <Pressable
          onPress={updateHeart}
          style={styles.pressable}
        />

        <View style={styles.icon}>
          <LottieView
            ref={lottie}
            source={require('../../assets/comment_heart.json')}
            style={styles.heartContainer}
            autoPlay={false}
            loop={false}
            speed={2}
            resizeMode='cover'
            onAnimationFinish={()=>{isFinish.current=true}}
          />
        </View>


        <Text style={styles.numHeart}>{heart.countHeart}</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
  },
  avatarContainer: {
    width: 70,
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'white',
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingEnd: 35,
  },
  commenter: {
    color: themes.SECONDCOLOR,
    fontWeight: '500',
    fontSize: themes.SIZE,
  },
  content: {
    color: themes.COLOR,
    fontSize: themes.SIZE,
  },
  readMore: {
    color: themes.SECONDCOLOR,
    fontSize: themes.NOTE,
    marginTop: 3,
    marginLeft: 3,
  },
  
  heartContainer: {
    width: 70,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressable: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 10,
  },
  heartLottie: {
    width: 20,
    height: 20,
    overflow: 'visible',
    zIndex: 9,
  },
  numHeart: {
    color: themes.SECONDCOLOR,
    fontSize: 20,
    marginTop: 5,
  }
})

export default Comment