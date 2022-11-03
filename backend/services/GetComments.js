import { supabase } from '../../backend/supabase';
import { clientID } from '../../src/global/ClientProfile';

const getComments = async (fetchID, pid, ac) => {
  const { data, error } = await supabase
    .rpc('get_comments', {
      ss_id: fetchID,
      p_id: pid,
    })
    .abortSignal(ac.signal);

  return data;
};

const isHeartComment = async (cmid) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('is_heart_comment', {
    client: client,
    comment_id: cmid,
  });

  return data;
};

const getCountChildComment = async (pid) => {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .eq('parent_id', pid);

  return count;
};

export { getComments, isHeartComment, getCountChildComment };
