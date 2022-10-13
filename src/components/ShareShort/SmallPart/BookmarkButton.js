import { View, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

import styles from './styles'

export default function BookmarkButton({ ssid, isBM }) {
  const icon = useRef(null);
  const [isMark, setIsMark] = useState(isBM);

  const isFinish = useRef(false);
  const isPressed = useRef(false);

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