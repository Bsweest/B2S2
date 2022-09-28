import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import FlashList from '@shopify/flash-list/dist/FlashList'
import { useCallback, useState } from 'react'

import themes from '../../values/themes'
import Comment from '.'
import { useEffect } from 'react'
import getComments from '../../services/GetComments'

const ParenComment = ({ pid }) => {
  const [openChildren, setOpenChildren] = useState(false);
  const [fetch, setFetch] = useState();
  const ac = new AbortController();

  // useEffect(() => {
  //   getComments(data, pid, ac).then((rs)=>{
  //     setFetch(rs);
  //   })
  
  //   return () => {
  //     ac.abort();
  //   }
  // }, [])
  

  const renderItem = useCallback(() => {
    return (
      <Comment isParent={false}/>
    )
  }, [fetch])
  
  const open = () => {
    setOpenChildren(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Comment isParent={true}/>

      <View style={styles.secondContainer}>
        <Pressable onPress={open}>
          <Text style={styles.openChildren}>
            {openChildren ? 'Hide Replies (1)' : 'View Replies (1)'}
            <Entypo 
              name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={18} color={themes.SECONDCOLOR}
            />
          </Text>
        </Pressable>

        {openChildren ? (
          <View style={{flex: 1}}>
            <FlashList
              data={fetch}
              keyExtractor={(item)=>item.id}
              renderItem={renderItem}
              estimatedItemSize={10}
              nestedScrollEnabled
            />
          </View>
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