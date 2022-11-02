import Ionicons from '@expo/vector-icons/Ionicons';
import ReadMore from '@fawazahmed/react-native-read-more';
import { useObservable, useSelector } from '@legendapp/state/react';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Video } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import TextTicker from 'react-native-text-ticker';

import mutateHeart from '../../../backend/mutation/HeartServices';
import shortServices from '../../../backend/services/ShortService';
import themes from '../../values/themes';
import BookmarkButton from './SmallPart/BookmarkButton';
import HeartButton from './SmallPart/HeartButton';
import OpenAvatar from './SmallPart/OpenAvatar';
import OpenComment from './SmallPart/OpenComment';
import ShareButton from './SmallPart/ShareButton';

const windowWidth = Dimensions.get('window').width;

const ShortVideo = ({ item, navigation, VIDEOHEIGHT, focusedIndex, index }) => {
  const { id: ssid, created_at, op_id, uri, caption, music } = item;

  const shouldPlay = useSelector(() => index === focusedIndex.get());
  //state for top component
  const [status, setStatus] = useState(false);
  const isDoneHeart = useObservable(true);
  const doubleTap = useRef();

  const inUse = useIsFocused();

  const { mutate, isLoading } = mutateHeart(ssid);

  //fetch data
  const { data, isSuccess, isError } = useQuery(['short_services', ssid], () =>
    shortServices(ssid),
  );

  useEffect(() => {
    shouldPlay ? setStatus(true) : setStatus(false);
  }, [shouldPlay]);

  useEffect(() => {
    if (!inUse) {
      if (status) setStatus(false);
    } else {
      if (shouldPlay) setStatus(true);
    }
  }, [inUse]);

  const changePlaying = () => {
    setStatus(!status);
  };

  const updateLike = () => {
    if (isLoading || !isDoneHeart.get()) return;
    mutate({ ssid: ssid, bool: !data.hs });
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: VIDEOHEIGHT,
        },
      ]}
    >
      {isSuccess ? (
        <>
          <Video
            style={styles.videoContainer}
            resizeMode={'contain'}
            shouldPlay={status}
            isLooping
            source={{ uri: uri }}
          />

          <TapGestureHandler waitFor={doubleTap} onActivated={changePlaying}>
            <TapGestureHandler
              ref={doubleTap}
              numberOfTaps={2}
              onActivated={updateLike}
            >
              <View
                style={[
                  styles.touch,
                  {
                    height: VIDEOHEIGHT,
                  },
                ]}
              />
            </TapGestureHandler>
          </TapGestureHandler>

          <View style={styles.overlay}>
            <View style={styles.leftContainer}>
              <View style={styles.musicContainer}>
                <Ionicons
                  name="md-musical-notes-sharp"
                  size={22}
                  style={styles.musicIcon}
                />
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
              <ShareButton ssid={ssid} />

              <BookmarkButton ssid={ssid} isBM={data.bm} />

              <OpenComment ssid={ssid} numCM={data.count_comment} />

              <HeartButton
                heart={data.hs}
                count_heart={data.count_heart}
                updateLike={updateLike}
                isDone={isDoneHeart}
              />

              <OpenAvatar navigation={navigation} op_id={op_id} />
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: themes.BACKGROUND,
  },
  videoContainer: {
    flex: 1,
    zIndex: 1,
  },
  touch: {
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
    flexDirection: 'row',
  },
  musicIcon: {
    color: '#FBFBFB',
    fontWeight: 600,
    marginBottom: -5,
  },
  musicTick: {
    fontSize: themes.SIZE,
    color: 'white',
  },
});

export default ShortVideo;
