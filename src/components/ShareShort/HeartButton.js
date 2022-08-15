import { View, Text, Pressable } from 'react-native'
import { useEffect, useRef } from 'react'

import LottieView from 'lottie-react-native'

import styles from './styles' 

export default function HeartButton({isLike, setIsLike, countHeart, setCountHeart}) {
  const icon = useRef(null);
  const firstLoad = useRef(true);
  const isFinish = useRef(false);

  useEffect(() => {
    if(isLike){
      isFinish.current = false;
      icon.current.play(0, 25);
      
      if(!firstLoad.current) {
        setCountHeart(prev => prev+1);
      }
    }
    else{
      isFinish.current = false;
      icon.current.play(7, 0);

      if(!firstLoad.current) {
        setCountHeart(prev => prev-1);
      }
    }

    firstLoad.current = false;
  }, [isLike])
  
  const updateLike = () => {
    if(!isFinish.current) return;
    setIsLike((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={updateLike} style={styles.icon}>
        <View style={styles.icon}>
          <LottieView
            ref={icon}
            source={require('../../assets/heart_animation.json')}
            style={styles.heartLottie}
            autoPlay={false}
            loop={false}
            resizeMode='cover'
            onAnimationFinish={()=>{isFinish.current=true}}          
          />
        </View>
      </Pressable>
      <Text style={styles.text}>
        {countHeart}
      </Text>
    </View>
  )
}
