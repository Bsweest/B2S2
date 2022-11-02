import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const addComment = async (props) => {
  const { content, p_id, ssid } = props;
  const poster = clientID.get();

  const { data, error } = await supabase
    .from('comments')
    .insert({
      content: content,
      uid: poster,
      parent_id: p_id,
      ssid: ssid,
    })
    .single();

  return data;
};

const addCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSuccess: (data, variables) => {
      const pid = variables.p_id;
      const fetchID = variables.ssid;
      // queryClient.setQueryData(
      //     ['comment_section', fetchID, pid],
      //     old => ([...old, data])
      // )
      queryClient.invalidateQueries(['comment_section', fetchID, pid]);

      if (pid) {
        queryClient.setQueryData(['cnt_childcomment', pid], (old) => ++old);
      }
    },
  });
};

export default addCommentMutation;
