import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState, useRef } from 'react'
import { Viewport } from '@skele/components'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { Video } from 'expo-av'
import { TapGestureHandler } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons'
import TextTicker from 'react-native-text-ticker'
import ReadMore from '@fawazahmed/react-native-read-more'

import HeartButton from './SmallPart/HeartButton'
import OpenComment from './SmallPart/OpenComment'
import BookmarkButton from './SmallPart/BookmarkButton'
import ShareButton from './SmallPart/ShareButton'
import OpenAvatar from './SmallPart/OpenAvatar'

import themes from '../../values/themes'
import { closeCS } from '../../redux/slices/CommentSectionSlice'

const feedItemHeight = Dimensions.get('window').height;
const feedItemWidth = Dimensions.get('window').width;

const ViewportAwareVideo = Viewport.Aware(Video);

const ShortVideo = ({ item }) => {
  const dispatch = useDispatch();

  //state for parent component
  const [status, setStatus] = useState(false);
  const inUse = useIsFocused();
  const doubleTap = useRef(null);

  //state for video information
  const [heart, setHeart] = useState({
    isLike: true,
    countHeart: 2000,
  });

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
    setHeart(prev => ({...prev, isLike: !prev.isLike}));
  }

  return (
    <View style={styles.container}>

      <ViewportAwareVideo
        style={styles.videoContainer}
        resizeMode={'contain'}
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
            <Ionicons name='md-musical-notes-sharp' size={22} style={styles.musicIcon}/>
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
          <ReadMore 
            style={styles.caption}
            numberOfLines={2}
            seeLessStyle={styles.readMore}
            seeMoreStyle={styles.readMore}
          >
            caption
          </ReadMore>
          <Text style={styles.originalPoster}>@OP</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <ShareButton/>
          <BookmarkButton/>
          <OpenComment data={item} setStatus={setStatus}/>
          <HeartButton 
            heart={heart} 
            setHeart={setHeart} 
          />
          <OpenAvatar/>
        </View>
      </View>
      
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    height: feedItemHeight, 
    width: feedItemWidth,
    backgroundColor: themes.BACKGROUND, 
   },
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
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
  },
  caption: {
    fontSize: themes.SIZE,
    color: 'white',
    justifyContent: 'center',
    marginBottom: 10,
  },
  readMore: {
    color: themes.SECONDCOLOR,
    fontSize: 18,
    marginTop: 3,
    marginLeft: 3,
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
    fontSize: themes.SIZE,
    color: 'white'
  }
})

export default ShortVideo;