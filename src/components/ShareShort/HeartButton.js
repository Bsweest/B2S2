import { View, Text, Pressable } from 'react-native'
import { useEffect, useRef } from 'react'

import LottieView from 'lottie-react-native'

import styles from './styles' 

export default function HeartButton({heart, setHeart}) {
  const icon = useRef(null);
  const firstLoad = useRef(true);
  const isFinish = useRef(false);

  useEffect(() => {
    if(heart.isLike){
      isFinish.current = false;
      icon.current.play(0, 25);
      
      if(!firstLoad.current) {
        setHeart(prev => ({...prev, countHeart: prev.countHeart+1}));
      }
    }
    else{
      isFinish.current = false;
      icon.current.play(7, 0);

      if(!firstLoad.current) {
        setHeart(prev => ({...prev, countHeart: prev.countHeart-1}));
      }
    }

    firstLoad.current = false;
  }, [heart.isLike])
  
  const updateLike = () => {
    if(!isFinish.current) return;
    setHeart(prev => ({...prev, isLike: !prev.isLike}));
  }

  return (
    <View style={styles.container}>

      <Pressable onPress={updateLike} style={styles.pressable}/>
      
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

      <Text style={styles.text}>
        {heart.countHeart}
      </Text>
    </View>
  )
}
