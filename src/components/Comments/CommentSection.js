import { BackHandler, StyleSheet, TextInput } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet'

import ParenComment from './ParenComment'

import { MaterialIcons } from '@expo/vector-icons'; 
import themes from '../../values/themes'

import { useQuery } from '@tanstack/react-query'
import { getComments } from '../../../backend/services/GetComments'

import { useSelector } from "@legendapp/state/react"
import CommentSectionState, { closeCommentSection } from '../../global/CommentSectionState'

const CommentSection = () => {
  const fetchID = useSelector(() => CommentSectionState.fetchID.get());
  const [isOpen, setIsOpen] = useState(false);

  const botSheet = useRef(null);
  const ac = new AbortController();

  const { data, isLoading, isSuccess, isError } = useQuery(
    ['comment_section', fetchID, null],
    () => getComments(fetchID, null, ac),
    { enabled: isOpen }
  )

  const close = () => {
    closeCommentSection();
  }

  const dispose = CommentSectionState.isOpen.onChange(bool => {
    if(bool) {
      setIsOpen(bool);
      botSheet.current.expand();
    }
  });

  useEffect(() => {
    const backAction = () => {
      botSheet.current.close()
      return true;
    };
 
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => {
      ac.abort();
      dispose();
      backHandler.remove();
    }
  }, [])

  const renderItem = ({item}) => {
    return (
      <ParenComment data={item}/>
    )
  }

  return (
    <BottomSheet
      ref={botSheet}
      snapPoints={['70%']}
      index={-1}
      handleHeight={40}
      enablePanDownToClose={true}
      onClose={close}
      backgroundStyle={styles.sheet}
      handleStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          nestedScrollEnabled
          style={styles.flatlist}
        />

        <BottomSheetView style={styles.addComment}>
          <TextInput 
            style={styles.input}
            placeholder='Add Comment...'
            multiline={true}
            placeholderTextColor={themes.SECONDCOLOR}
          />
          <BottomSheetView style={styles.icon}>
            <MaterialIcons
              name='tag-faces'
              size={26}
              color={themes.ACTIVE}
            />
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetView>

    </BottomSheet>
  )
}

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
  addComment: {
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    color: themes.COLOR,
    fontSize: themes.SIZE,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 3,
    borderRadius: 12,
    paddingVertical: 3,
    paddingLeft: 10,
    backgroundColor: themes.CONSTRACT,
    borderTopColor: themes.ACTIVE,
  },
  icon: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default CommentSection