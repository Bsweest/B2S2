import { StyleSheet, View, Dimensions, Text } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

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

import { useQuery } from '@tanstack/react-query'
import shortServices from '../../../backend/services/ShortService'
import { useSelector } from '@legendapp/state/react'

const windowWidth = Dimensions.get('window').width;

const ShortVideo = ({ item, navigation, VIDEOHEIGHT, focusedIndex, index }) => {
  const { id: ssid, created_at, op_id, uri, caption, music } = item;

  const shouldPlay = useSelector(() => index === focusedIndex.get());
  //state for top component
  const [status, setStatus] = useState(false);
  const inUse = useIsFocused();
  const doubleTap = useRef();

  // state heart button
  const [heart, setHeart] = useState(false);
  const isPressedHeart = useRef(false);

  //fetch data
  const { data, isLoading, isSuccess, isError } = useQuery(
    ['short_services', ssid, op_id],
    () => shortServices(ssid, op_id)
  )

  useEffect(() => {
    if(isSuccess) setHeart(data.hs);
  }, [isSuccess]);

  useEffect(() => {
    shouldPlay ? setStatus(true) : setStatus(false);
  }, [shouldPlay])

  const changePlaying = () => {
    setStatus(!status);
  }

  const updateLike = () => {
    isPressedHeart.current = true;
    setHeart(prev => !prev);
  }

  return (
    <View 
      style={[styles.container, {
        height: VIDEOHEIGHT
      }]}
    >
      {isSuccess ?
        <>
          <Video
            style={styles.videoContainer}
            resizeMode={'contain'}
            shouldPlay={status && inUse}
            isLooping
            source={{uri: uri}}
          />

          <TapGestureHandler
            waitFor={doubleTap}
            onActivated={changePlaying}
          >
            <TapGestureHandler
              ref={doubleTap}
              numberOfTaps={2}
              onActivated={updateLike}
            >
              <View 
                style={[styles.touch, {
                  height: VIDEOHEIGHT
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
              <ShareButton ssid={ssid}/>

              <BookmarkButton ssid={ssid} isBM={data.bm}/>

              <OpenComment ssid={ssid} numCM={data.count_comment}/>

              <HeartButton 
                heart={heart}
                count_heart={data.count_heart} 
                isPressedHeart={isPressedHeart}
                updateLike={updateLike}
              />

              <OpenAvatar navigation={navigation} op_id={op_id}/>
            </View>
          </View>
        </>
      :
        <></>
      }
      
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: themes.BACKGROUND, 
  },
  videoContainer: {
    flex: 1,
    zIndex: 1
  },
  touch:{
    width: windowWidth,
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    bottom: 0,
  },
  overlay: {
    width: windowWidth,
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