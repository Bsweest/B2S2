import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const updateHeartShort = async (props) => {
  const { ssid, bool } = props;
  const client = clientID.get();

  bool
    ? await supabase.from('_heart_short').insert({ uid: client, ssid: ssid })
    : await supabase
        .from('_heart_short')
        .delete()
        .match({ uid: client, ssid: ssid });
};

const mutateHeart = (ssid) => {
  const queryClient = useQueryClient();

  return useMutation(updateHeartShort, {
    onMutate: ({ bool }) => {
      queryClient.setQueryData(
        ['short_services', ssid],
        ({ bm, count_comment, count_heart, hs }) => ({
          bm: bm,
          count_comment: count_comment,
          hs: !hs,
          count_heart: bool ? ++count_heart : --count_heart,
        }),
      );
    },
  });
};

const updateHeartComment = async (props) => {
  const { cmid, bool } = props;
  const client = clientID.get();

  bool
    ? await supabase.from('_heart_comment').insert({ uid: client, cmid: cmid })
    : await supabase
        .from('_heart_comment')
        .delete()
        .match({ uid: client, cmid: cmid });
};

export const mutateHeartComment = () => {
  const queryClient = useQueryClient();

  return useMutation(updateHeartComment, {
    onMutate: ({ cmid }) => {
      queryClient.setQueryData(['comment_services', cmid], (old) => !old);
    },
  });
};

export default mutateHeart;
