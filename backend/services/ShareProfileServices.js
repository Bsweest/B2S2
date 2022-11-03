import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const getUserProfile = async (op_id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', op_id)
    .limit(1)
    .single();

  return data;
};

const getInteractNumbers = async (op_id) => {
  const { data, error } = await supabase.rpc('get_interact_number', {
    opid: op_id,
  });

  return data;
};

const getShortsOfUser = async (op_id) => {
  const { data, error } = await supabase
    .from('shareshorts')
    .select()
    .eq('op_id', op_id);

  return data;
};

const isFollowingOP = async (op_id) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('is_following', {
    client: client,
    op_id: op_id,
  });

  return data;
};

export { getShortsOfUser, getInteractNumbers, isFollowingOP };

export default getUserProfile;
