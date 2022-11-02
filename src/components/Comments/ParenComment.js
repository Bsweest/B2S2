import { Entypo } from '@expo/vector-icons';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import Comment from '.';
import {
  getComments,
  getCountChildComment,
} from '../../../backend/services/GetComments';
import themes from '../../values/themes';

const ParenComment = ({ data, replyData }) => {
  const { id: pid, ssid: fetchID } = data;
  const [openChildren, setOpenChildren] = useState(false);
  const ac = new AbortController();

  const { data: countChildren } = useQuery(['cnt_childcomment', pid], () =>
    getCountChildComment(pid),
  );

  const {
    data: children,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(
    ['comment_section', fetchID, pid],
    () => getComments(fetchID, pid, ac),
    { enabled: openChildren },
  );

  useEffect(() => {
    return () => {
      ac.abort();
    };
  }, []);

  const renderItem = ({ item }) => {
    return <Comment isParent={false} data={item} replyData={replyData} />;
  };

  const open = () => {
    setOpenChildren((prev) => !prev);
  };

  return (
    <BottomSheetView style={styles.container}>
      <Comment isParent={true} data={data} replyData={replyData} />

      <BottomSheetView style={styles.secondContainer}>
        {countChildren ? (
          <Pressable onPress={open}>
            <Text style={styles.openChildren}>
              {openChildren
                ? `Hide Replies (${countChildren})`
                : `View Replies (${countChildren})`}
              <Entypo
                name={openChildren ? 'chevron-thin-up' : 'chevron-thin-down'}
                size={14}
                color={themes.SECONDCOLOR}
              />
            </Text>
          </Pressable>
        ) : (
          <></>
        )}

        {openChildren ? (
          <BottomSheetView style={{ flex: 1 }}>
            <BottomSheetFlatList
              data={children}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              nestedScrollEnabled
            />
          </BottomSheetView>
        ) : (
          <></>
        )}
      </BottomSheetView>
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  secondContainer: {
    marginLeft: 50,
    flexDirection: 'column',
  },
  openChildren: {
    marginLeft: 10,
    color: themes.SECONDCOLOR,
    fontSize: themes.SMALL,
    marginTop: 2,
    alignItems: 'center',
  },
});

export default ParenComment;
