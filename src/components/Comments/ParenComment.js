import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import FlashList from '@shopify/flash-list/dist/FlashList'
import { useCallback, useState } from 'react'

import themes from '../../values/themes'
import Comment from '.'

const ParenComment = () => {
  const testdata = [0];
  const [openChildren, setOpenChildren] = useState(false);
  const readmore = openChildren ? 'Hide Replies (1)' : 'View Replies (1)';

  const renderItem = useCallback(() => {
    return (
      <Comment isParent={false}/>
    )
  }, [testdata])
  
  const open = () => {
    setOpenChildren(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Comment isParent={true}/>

      <View style={styles.secondContainer}>
        <Pressable onPress={open}>
          <Text style={styles.openChildren}>
            {readmore}
            <Entypo 
              name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={18} color={themes.SECONDCOLOR}
            />
          </Text>
        </Pressable>

        {/* {openChildren ? (
          <View style={{flex: 1}}>
            <FlashList
              data={testdata}
              keyExtractor={(item)=>item}
              renderItem={renderItem}
              estimatedItemSize={10}
            />
          </View>
        ):(
          <></>
        )} */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  secondContainer: {
    marginLeft: 50,
    flexDirection: 'column',
  },
  openChildren: {
    color: themes.SECONDCOLOR,
    fontSize: themes.SIZE,
    marginTop: 2,
  },
})

export default ParenComment