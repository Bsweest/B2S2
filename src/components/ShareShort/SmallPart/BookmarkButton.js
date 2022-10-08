import { View, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

import { isBookmark } from '../../../../backend/services/BookmarkServices'

import styles from './styles'

const temp = '6e25bebf-aaaa-4e98-89c2-6f11211f9539';

export default function BookmarkButton({ ssid }) {
  const icon = useRef(null);
  const [isMark, setIsMark] = useState(false);

  const isFinish = useRef(false);
  const isPressed = useRef(false);

  useEffect(() => {
    isBookmark(temp, ssid).then((rs) => {
      setIsMark(rs);
    })
  
    return () => {
      second
    }
  }, [])
  

  useEffect(() => {
    if(isMark){
      isFinish.current=false;
      icon.current.play(0, 90);

      if(isPressed) {}
    }
    else{
      isFinish.current=false;
      icon.current.play(90, 155);

      if(isPressed) {}
    }
  }, [isMark])
  
  const updateMark = () => {
    if(!isFinish.current) return;
    isPressed.current = true;
    setIsMark(!isMark);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={updateMark} style={styles.icon}>
        <View style={styles.icon}>
          <LottieView
            ref={icon}
            source={require('../../../assets/bookmark_animation.json')}
            style={styles.bmLottie}
            autoPlay={false}
            loop={false}
            resizeMode='cover'
            onAnimationFinish={()=>{isFinish.current=true;}}
          />
        </View>
      </Pressable>
    </View>
  )
}