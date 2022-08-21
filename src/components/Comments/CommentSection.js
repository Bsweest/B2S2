import { StyleSheet, TextInput } from 'react-native'
import { useRef, useEffect } from 'react'
import BottomSheet, {BottomSheetFlatList, BottomSheetView} from '@gorhom/bottom-sheet'
import { useSelector, useDispatch } from 'react-redux'

import ParenComment from './ParenComment'

import { MaterialIcons } from '@expo/vector-icons'; 
import themes from '../../values/themes'
import { closeCS } from '../../redux/slices/CommentSectionSlice'

const CommentSection = () => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(state => state.commentSection);

  const botSheet = useRef(null);
  const testdata = [1, 2, 3,];

  const close = () => {
    dispatch(closeCS());
  }

  useEffect(() => {
    if(isOpen){
      botSheet.current.expand();
    }
    else{
      botSheet.current.close();
    }
  }, [isOpen])

  const renderItem = ({item}) => {
    return (
      <ParenComment/>
    )
  }

  return (
    <BottomSheet
      ref={botSheet}
      snapPoints={['75%']}
      index={-1}
      handleHeight={40}
      enablePanDownToClose={true}
      onClose={close}
      backgroundStyle={styles.sheet}
      handleStyle={styles.handle}
    >
      <BottomSheetView style={styles.container}>
        <BottomSheetFlatList
          data={testdata}
          keyExtractor={(item)=>item}
          renderItem={renderItem}
          nestedScrollEnabled
          style={styles.flatlist}
        />

        <BottomSheetView style={styles.addComment}>
          <TextInput 
            style={styles.input}
            placeholder='Add Comment...'
            multiline={true}
            placeholderTextColor={themes.ACTIVE}
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