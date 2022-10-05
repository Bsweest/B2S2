import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import FlashList from '@shopify/flash-list/dist/FlashList'
import { useCallback, useState } from 'react'

import themes from '../../values/themes'
import Comment from '.'
import { useEffect } from 'react'
import { getComments } from '../../services/GetComments'

const ParenComment = ({ pid, data }) => {
  const [openChildren, setOpenChildren] = useState(false);
  const [children, setChildren] = useState();
  const ac = new AbortController();

  useEffect(() => {
    if(openChildren){
      getComments(data.id, pid, ac).then((rs)=>{
      setChildren(rs);
    })
  }
    return () => {
      ac.abort();
    }
  }, [openChildren])
  

  const renderItem = ({ item }) => {
    return (
      <Comment isParent={false} data={item}/>
    )
  }
  
  const open = () => {
    setOpenChildren(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Comment isParent={true} data={data}/>

      <View style={styles.secondContainer}>
        {data.count_children ?
          <Pressable onPress={open}>
          <Text style={styles.openChildren}>
            {openChildren ? 'Hide Replies (1)' : 'View Replies (1)'}
            <Entypo 
              name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
              size={18} color={themes.SECONDCOLOR}
            />
          </Text>
        </Pressable> : <></>
        }

        {openChildren ? (
          <View style={{flex: 1}}>
            <FlashList
              data={children}
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