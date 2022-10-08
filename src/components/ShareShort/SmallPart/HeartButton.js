import { View, Text, Pressable } from 'react-native'
import { useEffect, useRef } from 'react'

import LottieView from 'lottie-react-native'

import styles from './styles' 

export default function HeartButton({heart, setHeart, isPressedHeart, fetch}) {
  const icon = useRef(null);
  const isFinish = useRef(false);

  useEffect(() => {
    if(heart.isHeart){
      icon.current.play(0, 25);
      
      if(isPressedHeart.current) setHeart(prev => ({...prev, countHeart: prev.countHeart+1}));
    }
    else{
      icon.current.play(7, 0);

      if(isPressedHeart.current) setHeart(prev => ({...prev, countHeart: prev.countHeart-1}));
    }

  }, [heart.isHeart])
  
  const updateLike = () => {
    if(!isFinish.current) return;
    isPressedHeart.current = true;
    setHeart(prev => ({...prev, isHeart: !prev.isHeart}));
  }

  return (
    <View style={styles.container}>

      <Pressable 
        onPress={updateLike} 
        disabled={!fetch}
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
        {heart.countHeart}
      </Text>
    </View>
  )
}
