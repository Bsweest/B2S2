import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';

import styles from './styles';

const HeartButton = ({ heart, count_heart, updateLike, isDone }) => {
  const icon = useRef(null);

  useEffect(() => {
    if (heart) {
      isDone.set(false);
      icon.current.play(0, 25);
    } else {
      isDone.set(false);
      icon.current.play(7, 0);
    }
  }, [heart]);

  const onAnimationFinish = () => {
    isDone.set(true);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={updateLike} style={styles.pressable} />

      <View style={styles.icon}>
        <LottieView
          ref={icon}
          source={require('../../../assets/heart_animation.json')}
          style={styles.heartLottie}
          autoPlay={false}
          loop={false}
          resizeMode="cover"
          onAnimationFinish={onAnimationFinish}
        />
      </View>

      <Text style={styles.text}>{count_heart}</Text>
    </View>
  );
};

export default HeartButton;
