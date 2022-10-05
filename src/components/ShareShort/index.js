import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Viewport } from '@skele/components'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

import shortServices from '../../../backend/services/ShortService'

const feedItemHeight = Dimensions.get('window').height;
const feedItemWidth = Dimensions.get('window').width;

const ViewportAwareVideo = Viewport.Aware(Video);

const temp = '6e25bebf-aaaa-4e98-89c2-6f11211f9539';

const ShortVideo = ({ item, navigation, modal }) => {
  const { id, created_at, uri, caption, music } = item;

  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  //state for parent component
  const [status, setStatus] = useState(false);
  const inUse = useIsFocused();
  const doubleTap = useRef(null);

  //state for video information
  const [heart, setHeart] = useState(null);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    if(modal) playShort();

    shortServices(temp, id).then((rs)=>{
      setHeart({
        isHeart: rs.hs,
        countHeart: rs.count_heart,
      });
      setFetch(true);
    })
  }, []);

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
    setHeart(prev => ({...prev, isHeart: !prev.isHeart}));
  }

  return (
    <View 
      style={[styles.container, {
        height: feedItemHeight - insets.top - 45
      }]}
    >

      <ViewportAwareVideo
        style={styles.videoContainer}
        resizeMode={'contain'}
        shouldPlay={status && inUse}
        isLooping
        source={{uri: uri}}
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
          <View 
            style={[styles.touch, {
              height: feedItemHeight - insets.top - 45
            }]}
          />
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
            {caption}
          </ReadMore>
          <Text style={styles.originalPoster}>@OP</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <ShareButton/>
          {fetch ?
            <BookmarkButton/>
            : 
            <></>
          }
          <OpenComment ssid={id} setStatus={setStatus}/>
          {fetch ? 
            <HeartButton 
              heart={heart} 
              setHeart={setHeart} 
            />
            : 
            <></>
          }
          <OpenAvatar navigation={navigation} data={item}/>
        </View>
      </View>
      
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    width: feedItemWidth,
    backgroundColor: themes.BACKGROUND, 
  },
  videoContainer: {
    flex: 1,
    zIndex: 1
  },
  touch:{
    width: feedItemWidth,
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
    bottom: 10,
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
    fontSize: themes.SIZE,
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