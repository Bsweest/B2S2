import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    .single();

  return data;
};

const mutateChat = (room_id) => {
  const queryClient = useQueryClient();

  return useMutation(addChat, {
    // onSuccess: ( data ) => {
    //     queryClient.setQueryData(['get_chatroom', room_id],
    //         old => [ ...old, data ]
    //     )
    // }
  });
};

export default mutateChat;
