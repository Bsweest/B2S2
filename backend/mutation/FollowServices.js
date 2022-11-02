import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const updateFollow = async (props) => {
  const { op_id, bool } = props;
  const client = clientID.get();

  bool
    ? await supabase
        .from('_follow')
        .insert({ uid: client, following_id: op_id })
    : await supabase
        .from('_follow')
        .delete()
        .match({ uid: client, following_id: op_id });
};

const mutateFollow = (op_id) => {
  const queryClient = useQueryClient();

  return useMutation(updateFollow, {
    onMutate: () => {
      queryClient.setQueryData(['is_following', op_id], (old) => !old);
    },
  });
};

export default mutateFollow;
