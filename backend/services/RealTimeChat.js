import { useQueryClient } from '@tanstack/react-query';

import ChatRoomInFocused from '../../src/global/ChatRoomInFocused';
import { supabase } from '../supabase';

const ListenChatroom = (room_id) => {
  const queryClient = useQueryClient();

  supabase
    .channel(`public:messages:room_id=eq.${room_id}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `room_id=eq.${room_id}`,
      },
      (payload) => {
        queryClient.setQueryData(['get_chatroom', room_id], (old) => [
          payload.new,
          ...old,
        ]);
        queryClient.setQueryData(
          ['get_last_message', room_id],
          ({ id, last_read_id }) => {
            console.log(
              'chatID',
              ChatRoomInFocused.get(),
              'room',
              room_id,
              'id',
              payload.new.id,
              'last',
              last_read_id,
            );
            return {
              ...payload.new,
              last_read_id:
                ChatRoomInFocused.get() === room_id
                  ? payload.new.id
                  : last_read_id,
            };
          },
        );
      },
    )
    .subscribe();
};

export default ListenChatroom;
