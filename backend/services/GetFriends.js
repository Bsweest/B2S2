import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

export default GetFriends = async () => {
  const client = clientID.get();
  const { data } = await supabase.rpc('get_friends', {
    client: client,
  });

  return data;
};

const findRoomID = async (op_id) => {
  const client = clientID.get();

  const { data } = await supabase.rpc('find_room_id', {
    client: client,
    op_id: op_id,
  });

  return data;
};

export { findRoomID };
