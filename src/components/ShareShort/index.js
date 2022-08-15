import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import { Viewport } from '@skele/components'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { Video } from 'expo-av'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import TextTicker from 'react-native-text-ticker'

import HeartButton from './HeartButton'
import OpenComment from './OpenComment'
import BookmarkButton from './BookmarkButton'
import ShareButton from './ShareButton'
import OpenAvatar from './OpenAvatar'

import { closeCS } from '../../redux/slices/CommentSectionSlice'

const feedItemHeight = Dimensions.get('window').height;
const feedItemWidth = Dimensions.get('window').width;

const ViewportAwareVideo = Viewport.Aware(Video);

const ShortVideo = ({item}) => {
  const dispatch = useDispatch();

  //state for parent component
  const [status, setStatus] = useState(false);
  const inUse = useIsFocused();
  const doubleTap = useRef(null);

  //state for video information
  const [isLike, setIsLike] = useState(false);
  const [countHeart, setCountHeart] = useState(2000);

  const changeShort = () => {
    dispatch(closeCS());
    setStatus(!status);
  }
  const playShort = () => {
    if(!status) setStatus(true);
  }
  const pauseShort = () => {
    if(status) setStatus(false);
  }

  const updateLike = () => {
    setIsLike((prev) => !prev)
  }

  return (
    <View style={{height: feedItemHeight, width: feedItemWidth}}>

      <ViewportAwareVideo
        style={styles.videoContainer}
        resizeMode='cover'  
        shouldPlay={status && inUse}
        isLooping
        source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',}}
        onViewportEnter={playShort}
        onViewportLeave={pauseShort}
        preTriggerRatio={-1}
      />

      <TapGestureHandler
        waitFor={doubleTap}
        onActivated={changeShort}
      >
        <TapGestureHandler
          ref={doubleTap}
          numberOfTaps={2}
          onActivated={updateLike}
        >
          <View style={styles.touch}/>
        </TapGestureHandler>
      </TapGestureHandler>
    
      <View style={styles.overlay}>
        <View style={styles.leftContainer}>
          <View style={styles.musicContainer}>
            <Ionicons name='md-musical-notes-sharp' size={24} style={styles.musicIcon}/>
            <TextTicker
              style={styles.musicTick}
              duration={6000}
              loop
              bounce={false}
              repeatSpacer={50}
            >
              music hiphop for life letgo mot hai ba bon
            </TextTicker>
          </View> 
          <Text style={styles.caption}>caption</Text>
          <Text style={styles.originalPoster}>@OP</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <ShareButton/>
          <BookmarkButton/>
          <OpenComment data={item} setStatus={setStatus}/>
          <HeartButton 
            isLike={isLike} 
            setIsLike={setIsLike} 
            countHeart={countHeart} 
            setCountHeart={setCountHeart}
          />

          <OpenAvatar/>
        </View>
      </View>
      
    </View>
  ) 
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    zIndex: 1
  },
  touch:{
    width: feedItemWidth,
    height: feedItemHeight,
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    bottom: 0,
  },
  overlay: {
    width: feedItemWidth,
    position: 'absolute',
    flex: 1,
    zIndex: 3,
    flexDirection: 'row',
    paddingStart: 12,
    paddingEnd: 5,
    bottom: 85,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'column-reverse',
    width: '65%',
  },
  rightContainer: {
    width: 85,
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  originalPoster: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
  },
  caption: {
    fontSize: 20,
    color: 'white',
    justifyContent: 'center'
  },
  musicContainer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  musicIcon: {
    color: '#FBFBFB',
    fontWeight: 600,
    marginBottom: -5,
  },  
  musicTick: {
    fontSize: 20,
    color: 'white'
  }
})

export default ShortVideo;