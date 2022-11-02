import { View, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'

import styles from './styles'
import mutateBookmark from '../../../../backend/mutation/BookmarkServices';

export default function BookmarkButton({ ssid, isBM }) {
  const icon = useRef(null);
  const isFinish = useRef(false);

  const { mutate, isLoading } = mutateBookmark(ssid);

  useEffect(() => {
    if(isBM){
      isFinish.current=false;
      icon.current.play(0, 90);
    }
    else{
      isFinish.current=false;
      icon.current.play(90, 155);
    }
  }, [isBM])
  
  const updateMark = () => {
    if(!isFinish.current || isLoading ) return;
    
    mutate({ssid: ssid, bool: !isBM});
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