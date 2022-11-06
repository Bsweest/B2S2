import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../backend/supabase';
import { clientID } from '../../src/global/ClientProfile';

//* Get All comment
const getComments = async (fetchID, pid, ac) => {
  const { data, error } = await supabase
    .rpc('get_comments', {
      ss_id: fetchID,
      p_id: pid,
    })
    .abortSignal(ac.signal);

  return data;
};
const queryCommentSection = (fetchID, pid, ac, isOpen) => {
  return useQuery(
    ['comment_section', fetchID, pid],
    () => getComments(fetchID, pid, ac),
    { enabled: isOpen },
  );
};

//* Check Heart Comment
const isHeartComment = async (cmid) => {
  const client = clientID.get();

  const { data, error } = await supabase.rpc('is_heart_comment', {
    client: client,
    comment_id: cmid,
  });

  return data;
};
const queryCheckHeartComment = (cmid) => {
  return useQuery(['comment_services', cmid], () => isHeartComment(cmid));
};

//* Get number of Child comment
const getCountChildComment = async (pid) => {
  const { count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .eq('parent_id', pid);

  return count;
};
const queryCountChildComment = (pid) => {
  return useQuery(['cnt_childcomment', pid], () => getCountChildComment(pid));
};

export {
  getComments,
  queryCommentSection,
  queryCheckHeartComment,
  queryCountChildComment,
};
