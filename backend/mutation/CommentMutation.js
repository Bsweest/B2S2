import { useMutation } from '@tanstack/react-query';

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
    .select()
    .single();

  return data;
};

const addCommentMutation = () => {
  return useMutation(addComment);
};

export default addCommentMutation;
