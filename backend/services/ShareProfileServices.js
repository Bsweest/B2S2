import { useQuery } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

//Get User Data
const getUserProfile = async (op_id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', op_id)
    .limit(1)
    .single();

  return data;
};

const queryUserData = (op_id) => {
  return useQuery(['get_user_data', op_id], () => getUserProfile(op_id), {
    placeholderData: {
      avatar_url: '',
    },
  });
};
const ClientData = () => {
  const op_id = clientID.get();

  return useQuery(['get_user_data', op_id], () => getUserProfile(op_id), {
    placeholderData: {
      avatar_url: '',
    },
  });
};

// Get Following, Follower, Number of heart
const getInteractNumbers = async (op_id) => {
  const { data, error } = await supabase.rpc('get_interact_numbers', {
    pf_id: op_id,
  });

  if (error) throw new Error(error);

  return data;
};
const queryInteractNumbers = (op_id) => {
  return useQuery(['get_interact_numbers', op_id], () =>
    getInteractNumbers(op_id),
  );
};

//* Get all short videos of user
const getShortsOfUser = async (op_id) => {
  const { data, error } = await supabase
    .from('shareshorts')
    .select()
    .eq('op_id', op_id);

  return data;
};
const queryShortsOfUser = (op_id) => {
  return useQuery(['get_user_shorts', op_id], () => getShortsOfUser(op_id));
};

//* Get shorts that user like
const getLikedShorts = async (op_id) => {
  const { data, error } = await supabase.rpc('get_liked_shorts', {
    props_id: op_id,
  });

  return data;
};
const queryLikedShorts = (op_id) => {
  return useQuery(['get_liked_shorts', op_id], () => getLikedShorts(op_id));
};

//* Get shorts that user like
const getMarkedShorts = async (op_id) => {
  const { data, error } = await supabase.rpc('get_marked_shorts', {
    props_id: op_id,
  });

  return data;
};
const queryMarkedShorts = (op_id) => {
  return useQuery(['get_marked_shorts', op_id], () => getMarkedShorts(op_id));
};

//* Check Follow
const isFollowingOP = async (op_id) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('is_following', {
    client: client,
    op_id: op_id,
  });

  return data;
};
const queryCheckFollow = (op_id) => {
  return useQuery(['is_following', op_id], () => isFollowingOP(op_id));
};

//* Check Follow back
const isFollowingBack = async (op_id) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('is_following', {
    client: op_id,
    op_id: client,
  });

  return data;
};
const queryCheckFollowBack = (op_id) => {
  return useQuery(['is_following_back', op_id], () => isFollowingBack(op_id));
};

export {
  queryShortsOfUser,
  queryInteractNumbers,
  queryCheckFollow,
  ClientData,
  queryCheckFollowBack,
  queryLikedShorts,
  queryMarkedShorts,
};

export default queryUserData;
