import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRef, useState, useEffect, useMemo } from 'react'
import LottieView from 'lottie-react-native'

import ReadMore from '@fawazahmed/react-native-read-more'
import { isHeartComment } from '../../../backend/services/GetComments'
import RelativeTime from '../../hooks/RelativeTime'

import themes from '../../values/themes'

const temp = '6e25bebf-aaaa-4e98-89c2-6f11211f9539';

const Comment = ({isParent, data}) => {
  const { id, created_at, ssid, uid, content, count_heart, parent_id } = data;

  const relativeTime = useMemo(() => RelativeTime(created_at), [created_at]);

  const lottie = useRef(null);
  const isFinish = useRef(false);
  const isPressed = useRef(false);
  const haveFetch = useRef(false);

  const [like, setLike] = useState();
  const [count, setCount] = useState(count_heart);

  useEffect(() => {
    isHeartComment(temp, id).then((rs)=>{
      setLike(rs);
      haveFetch.current = true;
    })
  
    return () => {}
  }, [])

  useEffect(()=>{
    if(like) {
      isFinish.current = false;
      lottie.current.play(40, 80);
      if(isPressed.current) setCount(prev => (prev+1));
    }
    else {
      isFinish.current = false;
      lottie.current.play(40, 0);
      if(isPressed.current) setCount(prev => (prev-1));
    }
  }, [like])

  const updateHeart = () => {
    if(!isFinish.current) return;
    isPressed.current = true;
    setLike(prev => !prev);
  }

  const reply = () => {
    
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
          {content}
        </ReadMore>

        <View style={styles.commentInfo}>
          <Text style={styles.infoTime}>
            {relativeTime}
          </Text>
          <Pressable onPress={reply} >
            <Text style={styles.reply}>
              Reply
            </Text>
          </Pressable>
        </View>
        
      </View>

      <View style={styles.heartContainer}>
        <Pressable
          disabled={!haveFetch.current}
          onPress={updateHeart}
          style={styles.pressable}
        />

        <View style={styles.icon}>
          <LottieView
            ref={lottie}
            source={require('../../assets/comment_heart.json')}
            autoPlay={false}
            loop={false}
            speed={2}
            resizeMode='cover'
            style={styles.heartLottie}
            onAnimationFinish={()=>isFinish.current=true}
          />
        </View>

        <Text style={styles.numHeart}>{count}</Text>
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
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'white',
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
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
  commentInfo: {
    flexDirection: 'row',
    marginTop: 5,
    // justifyContent: 'flex-end',
  },
  infoTime: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
    marginRight: 20,
  },
  reply: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
    fontWeight: 'bold'
  },
  
  heartContainer: {
    width: 70,
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
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
    width: 50,
    height: 50,
    overflow: 'visible',
    zIndex: 9,
  },
  numHeart: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SIZE,
  }
})

export default Comment