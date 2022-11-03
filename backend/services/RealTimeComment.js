import { useQueryClient } from '@tanstack/react-query';

import CommentSectionState from '../../src/global/CommentSectionState';
import { supabase } from '../supabase';

const ListenCommentSection = () => {
  const queryClient = useQueryClient();

  CommentSectionState.fetchID.onChange((fetchID) => {
    if (!fetchID) return;

    supabase
      .channel(`public:comments:ssid=eq.${fetchID}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `ssid=eq.${fetchID}`,
        },
        (payload) => {
          const pid = payload.new.parent_id;

          queryClient.setQueryData(['comment_section', fetchID, pid], (old) => [
            ...old,
            payload.new,
          ]);

          queryClient.setQueryData(
            ['short_services', payload.new.ssid],
            ({ bm, count_comment, count_heart, hs }) => ({
              bm: bm,
              count_comment: count_comment,
              hs: hs,
              count_heart: ++count_heart,
            }),
          );

          if (pid)
            queryClient.setQueryData(['cnt_childcomment', pid], (old) => ++old);
        },
      )
      .subscribe();
  });
};

export default ListenCommentSection;
