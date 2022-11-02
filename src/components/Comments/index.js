import { Text, StyleSheet, Image, Pressable } from 'react-native'
import { useRef, useEffect, useMemo } from 'react'
import LottieView from 'lottie-react-native'
import { BottomSheetView } from '@gorhom/bottom-sheet'

import ReadMore from '@fawazahmed/react-native-read-more'
import RelativeTime from '../../hooks/RelativeTime'
import themes from '../../values/themes'

import { useQuery } from '@tanstack/react-query'
import { isHeartComment } from '../../../backend/services/GetComments'
import getUserProfile from '../../../backend/services/ShareProfileServices'
import { mutateHeartComment } from '../../../backend/mutation/HeartServices'
import { useObservable } from '@legendapp/state/react'

const Comment = ({ isParent, data, replyData }) => {
  const { id: cmid, created_at, ssid, uid: op_id, content, count_heart, parent_id } = data;

  const relativeTime = useMemo(() => RelativeTime(created_at), [created_at]);

  const lottie = useRef(null);
  const isFinish = useRef(false);
  const isPressed = useRef(false);
  const count= useObservable(count_heart);

  const { data: isLike, isSuccess, isLoading, isError } = useQuery(
    ['comment_services', cmid],
    () => isHeartComment(cmid),
  );
  const { data: commenter } = useQuery(
    ['get_user_data', op_id],
    () => getUserProfile(op_id),
    {
      placeholderData: {
        avatar_url: '',
      }
    }
  )
  const { mutate } = mutateHeartComment();

  useEffect(()=>{
    if(isLike) {
      isFinish.current = false;
      lottie.current.play(40, 80);
      if(isPressed.current) count.set(prev => ++prev);
    }
    else {
      isFinish.current = false;
      lottie.current.play(40, 0);
      if(isPressed.current) count.set(prev => --prev);
    }
  }, [isLike])

  const updateHeart = () => {
    if(!isFinish.current) return;
    isPressed.current = true;
    mutate({ cmid: cmid, bool: !isLike });
  }

  const reply = () => {
    replyData.set({ com_id: cmid, rep_name: commenter.displayname })
  }

  return (
    <BottomSheetView style={styles.container}>

      <BottomSheetView style={[styles.avatarContainer, {
        width: isParent ? 50 : 40,
      }]}>
        <Image 
          style={[styles.avatar, {
            height: isParent ? 40 : 30,
            width: isParent ? 40 : 30,
            borderRadius: isParent ? 20 : 15,
          }]}
          source={commenter.avatar_url ? 
            {uri: commenter.avatar_url}
            :
            require('../../assets/placeholder/user.png')
          }
        /> 
      </BottomSheetView>

      <BottomSheetView style={styles.commentContainer}>
        
        <Text style={styles.commenter}>{commenter.displayname}</Text>
        
        <ReadMore 
          style={styles.content}
          numberOfLines={2}
          seeLessStyle={styles.readMore}
          seeMoreStyle={styles.readMore}
        >
          {content}
        </ReadMore>

        <BottomSheetView style={styles.commentInfo}>
          <Text style={styles.infoTime}>
            {relativeTime}
          </Text>
          <Pressable onPress={reply} >
            <Text style={styles.reply}>
              Reply
            </Text>
          </Pressable>
        </BottomSheetView>
        
      </BottomSheetView>

      <BottomSheetView style={styles.heartContainer}>
        <Pressable
          disabled={!isSuccess}
          onPress={updateHeart}
          style={styles.pressable}
        />

        <BottomSheetView style={styles.icon}>
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
        </BottomSheetView>

        <Text style={styles.numHeart}>{count}</Text>
      </BottomSheetView>

    </BottomSheetView>
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