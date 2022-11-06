import { useQuery } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

//* Get all friend data
const GetFriends = async () => {
  const client = clientID.get();
  const { data } = await supabase.rpc('get_friends', {
    client: client,
  });

  return data;
};
const queryAllFriend = () => {
  return useQuery(['get_friends'], GetFriends);
};

//* Return room ID of friend, if not exist return null
const findRoomID = async (op_id) => {
  const client = clientID.get();

  const { data } = await supabase.rpc('find_room_id', {
    client: client,
    op_id: op_id,
  });

  return data;
};

export { findRoomID };
export default queryAllFriend;
