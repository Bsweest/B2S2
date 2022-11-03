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

export default mutateChat;
