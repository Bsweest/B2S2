import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useObservable, useSelector } from '@legendapp/state/react';
import React, { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';

import addCommentMutation from '../../../backend/mutation/CommentMutation';
import { queryCommentSection } from '../../../backend/services/GetComments';
import ListenCommentSection from '../../../backend/services/RealTimeComment';
import CommentSectionState, {
  closeCommentSection,
} from '../../global/CommentSectionState';
import themes from '../../values/themes';
import ParenComment from './ParenComment';

const CommentSection = () => {
  const { isOpen, fetchID } = useSelector(() => CommentSectionState.get());

  const [content, setContent] = useState('');

  const replyData = useObservable({ com_id: null, rep_name: null });
  const hidden = useSelector(() => !replyData.com_id.get());

  const botSheet = useRef(null);
  const ac = new AbortController();

  const { data, isLoading, isError } = queryCommentSection(
    fetchID,
    null,
    ac,
    isOpen,
  );

  const { mutate, isLoading: doingAdd, status } = addCommentMutation();

  ListenCommentSection();

  const onOpen = CommentSectionState.isOpen.onChange((bool) => {
    if (bool) botSheet.current.expand();
  });

  const onClose = (index) => {
    if (index === -1) {
      ac.abort();
      notReply();
      closeCommentSection();
    }
  };

  useEffect(() => {
    const backAction = () => {
      botSheet.current.close();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      ac.abort();
      onOpen();
      backHandler.remove();
    };
  }, []);

  useEffect(() => {
    switch (status) {
      case 'error':
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Unable to post the comments.',
        });
        return;
      case 'success':
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: replyData.rep_name.get()
            ? `Reply user ${replyData.rep_name.get()} success`
            : `Your Comment have been posted.`,
        });
        notReply();
        return;
    }
  }, [status]);

  const postComment = () => {
    mutate({
      content: content,
      p_id: replyData.com_id.get(),
      ssid: fetchID,
    });
  };

  const notReply = () => {
    replyData.set({ com_id: null, rep_name: null });
    setContent('');
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    return <ParenComment data={item} replyData={replyData} ac={ac} />;
  };

  return (
    <BottomSheet
      ref={botSheet}
      snapPoints={['70%']}
      index={-1}
      handleHeight={40}
      enablePanDownToClose={true}
      onChange={onClose}
      backgroundStyle={styles.sheet}
      handleStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <BottomSheetView style={styles.flatlist}>
          <BottomSheetFlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            nestedScrollEnabled
          />
        </BottomSheetView>

        <BottomSheetView style={styles.bottomContainer}>
          {hidden ? (
            <></>
          ) : (
            <BottomSheetView style={styles.replyBox}>
              <Text style={styles.staticText}>replying</Text>
              <Text style={styles.replyData}>{replyData.rep_name}</Text>
              <Pressable onPress={notReply}>
                <Octicons
                  name="x-circle-fill"
                  size={12}
                  color={themes.CONSTRACT}
                />
              </Pressable>
            </BottomSheetView>
          )}
          <BottomSheetView style={styles.addComment}>
            <TextInput
              style={styles.input}
              placeholder="Add Comment..."
              multiline={true}
              maxLength={300}
              placeholderTextColor={themes.SECONDCOLOR}
              onChangeText={setContent}
              value={content}
            />
            <Pressable onPress={postComment}>
              <BottomSheetView style={styles.icon}>
                <MaterialIcons name="send" size={26} color={themes.BLUE} />
              </BottomSheetView>
            </Pressable>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: themes.BACKGROUND,
  },
  mshort: {
    zIndex: 1,
  },
  handle: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 3,
  },
  flatlist: {
    flex: 1,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: themes.CONSTRACT,
    paddingLeft: 15,
  },
  replyBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  staticText: {
    color: themes.SECONDCOLOR,
    fontSize: themes.NOTE,
  },
  replyData: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
    marginHorizontal: 3,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    color: themes.COLOR,
    fontSize: themes.SIZE,
    marginTop: 5,
    marginBottom: 3,
    paddingLeft: 10,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: themes.CONSTRACT,
    borderTopColor: themes.ACTIVE,
    maxHeight: 100,
  },
  icon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
});

export default CommentSection;
