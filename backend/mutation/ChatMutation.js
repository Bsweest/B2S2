import { useMutation } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const addChat = async (props) => {
  const { content, room_id } = props;
  const sender = clientID.get();

  const { data, error } = await supabase
    .from('messages')
    .insert({
      content: content,
      sender: sender,
      room_id: room_id,
    })
    .select()
    .single();

  return data;
};

const mutateChat = () => {
  return useMutation(addChat);
};

const changeReadStatus = async (props) => {
  const client = clientID.get();
  const { room_id, messID } = props;

  const { data, error } = await supabase
    .from('chat_parti')
    .update({ last_read_id: messID })
    .match({
      room_id: room_id,
      parti_id: client,
    });

  if (error) throw new Error(error);

  return data;
};

export const mutateLastReadMess = () => {
  return useMutation(changeReadStatus);
};

export default mutateChat;
