import { useQuery } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

//* get all chat rooms
const getChatRooms = async (bool) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('get_chatrooms', {
    client: client,
    is_friend: bool,
  });

  return data;
};
const queryChatRooms = (bool) => {
  return useQuery(['mess_list', bool], () => getChatRooms(bool));
};

//* Get last Messages of Chatroom
const getLastMessage = async (room_id) => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('room_id', room_id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return data;
};
const queryLastMessage = (room_id) => {
  return useQuery(
    ['get_last_message', room_id],
    () => getLastMessage(room_id),
    {
      placeholderData: {
        content: '',
        read_status: true,
      },
    },
  );
};

//* get messages of chat room
const getInfiniteMessages = async (room_id) => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('room_id', room_id)
    .order('created_at', { ascending: false });

  return data;
};
const queryInfiniteMessages = (room_id) => {
  return useQuery(['get_chatroom', room_id], () =>
    getInfiniteMessages(room_id),
  );
};

//* Create Chat room and Add participant
const createRoom = async (op_id) => {
  const client = clientID.get();

  const { data } = await supabase.from('chatrooms').insert().select().single();

  await supabase.from('chat_parti').insert([
    { room_id: data.id, parti_id: client },
    { room_id: data.id, parti_id: op_id },
  ]);
};

export { queryChatRooms, queryLastMessage, queryInfiniteMessages, createRoom };
