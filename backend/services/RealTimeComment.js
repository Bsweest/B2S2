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

          if (pid)
            queryClient.setQueryData(
              ['cnt_childcomment', pid],
              (prev) => ++prev,
            );

          queryClient.setQueryData(
            ['comment_section', fetchID, pid],
            (prev) => [...prev, payload.new],
          );

          queryClient.setQueryData(['short_services', fetchID], (prev) => ({
            ...prev,
            count_comment: ++prev.count_comment,
          }));
        },
      )
      .subscribe();
  });
};

export default ListenCommentSection;
