import { View, Text, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'

import LottieView from 'lottie-react-native'

import styles from './styles' 

export default function HeartButton({ heart, count_heart, isPressedHeart, updateLike}) {
  const icon = useRef(null);
  const isFinish = useRef(false);

  const [countHeart, setCountHeart] = useState(count_heart);

  useEffect(() => {
    if(heart){
      icon.current.play(0, 25);
      
      if(isPressedHeart.current) {
        setCountHeart(prev => prev + 1);
      }
    }
    else{
      icon.current.play(7, 0);

      if(isPressedHeart.current) {
        setCountHeart(prev => prev - 1);
      }
    }

  }, [heart])

  return (
    <View style={styles.container}>

      <Pressable 
        onPress={updateLike} 
        style={styles.pressable}
      />
      
      <View style={styles.icon}>
        <LottieView
          ref={icon}
          source={require('../../../assets/heart_animation.json')}
          style={styles.heartLottie}
          autoPlay={false}
          loop={false}
          resizeMode='cover'
          onAnimationFinish={()=>{isFinish.current=true}}          
        />
      </View>

      <Text style={styles.text}>
        {countHeart}
      </Text>
    </View>
  )
}
