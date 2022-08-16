import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
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
          <Text style={styles.viewmore}>
            {readmore}
            <Entypo 
              name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={18} color={themes.SECONDCOLOR}
            />
          </Text>
        </Pressable>

        {openChildren ? (
          <BottomSheetFlatList
            data={testdata}
            keyExtractor={(item)=>item}
            renderItem={renderItem}
          />
        ):(
          <></>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    secondContainer: {
        marginLeft: 70,
        flexDirection: 'column',
    },
    viewmore: {
        color: themes.SECONDCOLOR,
        fontSize: 18,
        marginTop: 2,
    },
})

export default ParenComment