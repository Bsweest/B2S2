import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const getChatRooms = async () => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('get_chatrooms', {
    client: client,
  });

  return data;
};

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

const getInfiniteMessages = async (room_id) => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('room_id', room_id)
    .order('created_at', { ascending: false });

  return data;
};

const createRoom = async (op_id) => {
  const client = clientID.get();

  const { data } = await supabase.from('chatrooms').insert().select().single();

  await supabase.from('chat_parti').insert([
    { room_id: data.id, parti_id: client },
    { room_id: data.id, parti_id: op_id },
  ]);
};

export { getChatRooms, getLastMessage, getInfiniteMessages, createRoom };
