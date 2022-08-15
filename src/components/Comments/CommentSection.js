import { StyleSheet, View, Text } from 'react-native'
import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet'

import themes from '../../values/themes'
import { closeCS } from '../../redux/slices/CommentSectionSlice'

const CommentSection = () => {
  const dispatch = useDispatch();

  const botSheet = useRef(null);
  const flatList = useRef(null);
  const [canSnap, setCanSnap] = useState(true);
  const { isOpen, data } = useSelector(state => state.isCsOpen);
  const testdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const close = () => {
    dispatch(closeCS());
  }

  useEffect(() => {
    console.log(data);

    if(isOpen){
      botSheet.current.expand();
    }
    else{
      botSheet.current.close();
    }
  }, [isOpen])

  const renderItem = ({item}) => {
    return (
      <View>
        <Text style={styles.text}>test text</Text>
      </View>
    )
  }

  return (
    <BottomSheet
      ref={botSheet}
      snapPoints={['75%']}
      index={-1}
      handleHeight={40}
      enablePanDownToClose={canSnap}
      onClose={close}
      backgroundStyle={styles.sheet}
      handleStyle={styles.handle}
    >
      <BottomSheetFlatList
        ref={flatList}
        data={testdata}
        keyExtractor={(item)=>item}
        renderItem={renderItem}
        estimatedItemSize={10}
        onScrollBeginDrag={()=>setCanSnap(false)}
        onScrollEndDrag={()=>setCanSnap(true)}
      />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: themes.BACKGROUND,
  },
  handle: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  comment: {
    height: 70,
  },
  text: {
    color: themes.ACTIVE,
    fontSize: 16,
  }
})

export default CommentSection