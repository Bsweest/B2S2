import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clientID } from '../../src/global/ClientProfile';
import { supabase } from '../supabase';

const updateAvatar = async (client, file, isAdd) => {
  const queryClient = useQueryClient();

  const { data, error } = isAdd
    ? await supabase.storage.from('avatars').upload(`${client}.png`, file)
    : await supabase.storage.from('avatars').update(`${client}.png`, file);

  if (error) return false;

  if (!isAdd) return true;

  const url = `https://utpupcffsaillsgoohtt.supabase.co/storage/v1/object/public/avatars/${client}.png`;

  await supabase.from('profiles').update({ avatar_url: url }).eq('id', client);

  queryClient.setQueryData(['get_user_data', client], (prev) => ({
    ...prev,
    avatar_url: url,
  }));

  return true;
};

const updateProfleField = async (props) => {
  const { field, value, client } = props;

  const { data, error } = await supabase
    .from('profiles')
    .update({ [field]: value })
    .eq('id', client);

  if (error) throw new Error(error);

  return data;
};
const mutateProfileField = () => {
  const queryClient = useQueryClient();

  return useMutation(updateProfleField, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get_user_data', clientID.get()]);
    },
  });
};

export { updateAvatar, mutateProfileField };
