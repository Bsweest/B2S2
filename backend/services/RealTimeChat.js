import { useQueryClient } from '@tanstack/react-query';

import { supabase } from '../supabase';

export const changeReadStatus = async (id) => {
  await supabase.from('messages').update({ read_status: true }).eq('id', id);
};

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
          () => payload.new,
        );
      },
    )
    .subscribe();
};

export default ListenChatroom;
