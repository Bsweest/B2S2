import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable } from 'react-native';

import { createMotionAnimatedComponent } from '@legendapp/motion';

import Svg, {
  Circle,
  Path,
} from "react-native-svg";

const MotionPath = createMotionAnimatedComponent(Path);
const MotionCircle = createMotionAnimatedComponent(Circle);
const MotionSvg = createMotionAnimatedComponent(Svg);

const notFollow = {
  path: 'M35.0476 20.3636C35.0476 18.757 33.6832 17.4545 32 17.4545C30.3169 17.4545 28.9524 18.757 28.9524 20.3636V29.0909H19.8095C18.1264 29.0909 16.7619 30.3933 16.7619 32C16.7619 33.6067 18.1264 34.9091 19.8095 34.9091H28.9524V43.6364C28.9524 45.2431 30.3169 46.5455 32 46.5455C33.6832 46.5455 35.0476 45.2431 35.0476 43.6364V34.9091H44.1905C45.8737 34.9091 47.2381 33.6067 47.2381 32C47.2381 30.3933 45.8737 29.0909 44.1905 29.0909H35.0476V20.3636Z',
  color: 'white',
  background: '#EA4359',
  strokeWidth: 0,
};

const followed = {
  path: 'M51.1955 18.0076L25.7323 43.769L12.8036 30.6538C11.4757 29.3104 9.32378 29.3104 7.9959 30.6538C6.66803 31.9973 6.66803 34.1744 7.9959 35.5178L23.2073 50.9414C24.6025 52.3529 26.864 52.3529 28.2592 50.9414L56.0041 22.8715C57.332 21.5281 57.332 19.351 56.0041 18.0076C54.6762 16.6641 52.5234 16.6641 51.1955 18.0076Z',
  color: '#3DCA76',
  background: '#FBFBFB',
  strokeWidth: 3,
}

const FollowButton = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [svgProps, setSvgProps] = useState(notFollow);
  const [radius, setRadius] = useState(30);
  const isFinish = useRef(false);
  
  const update = ()=>{
    if(!isFinish.current) return;
    setIsFollow(prev=> !prev);
  }

  useEffect(() => {
    if(isFollow) {
      isFinish.current = false;
      setSvgProps(followed);
      setRadius(38);

      const timer = setTimeout(() => {
        isFinish.current = false;
        setRadius(30);
      }, 1000);

      return () => clearTimeout(timer)
    }

    else {
      setSvgProps(notFollow);
    }

  }, [isFollow])
  

  return (
    <Pressable onPress={update}>
      <MotionSvg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={styles.followButton}
        animateProps={{
          width: radius,
          height: radius,
          left: -radius/2,
          bottom: -radius/2,
        }}
        transition={{
          type: 'tween',
          duration: 1000,
        }}
        onAnimationComplete={()=>isFinish.current=true}
      >
        <MotionCircle
          cx={32}
          cy={32}
          r={31}
          stroke="#EA4359"
          animateProps={{
            fill: svgProps.background,
            strokeWidth: svgProps.strokeWidth,
          }}
        />
        <MotionPath
          d={svgProps.path}
          animateProps={{
            fill: svgProps.color,
          }}
        />
      </MotionSvg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  followButton: {
    position: 'absolute',
  },
})

export default FollowButton;
