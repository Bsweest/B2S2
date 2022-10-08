import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'

import themes from '../../values/themes'
import Comment from '.'
import { useEffect } from 'react'
import { getComments, getCountChildComment } from '../../../backend/services/GetComments'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'

const ParenComment = ({ data }) => {
  const [openChildren, setOpenChildren] = useState(false);
  const [children, setChildren] = useState();
  const [countChildren, setCountChildren] = useState(0);
  const ac = new AbortController();

  useEffect(() => {
    getCountChildComment(data.id).then((rs)=>{
      setCountChildren(rs);
    })
  
    return () => {
      ac.abort();
    }
  }, [])

  const renderItem = ({ item }) => {
    return (
      <Comment isParent={false} data={item}/>
    )
  }
  
  const open = () => {
    setOpenChildren(prev => !prev);
    if(openChildren){
      getComments(data.ssid, data.id, ac).then((rs)=>{
        setChildren(rs);
      })
    }
  }

  return (
    <View style={styles.container}>
      <Comment isParent={true} data={data}/>

      <View style={styles.secondContainer}>
        {countChildren ?
          <Pressable onPress={open}>
            <Text style={styles.openChildren}>
              {openChildren ? `Hide Replies (${countChildren})` : `View Replies (${countChildren})`}
              <Entypo 
                name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
                size={18} color={themes.SECONDCOLOR}
              />
            </Text>
          </Pressable>
          :<></>
        }

        {openChildren ? (
          <View style={{flex: 1}}>
            <BottomSheetFlatList
              data={children}
              keyExtractor={(item)=>item.id}
              renderItem={renderItem}
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