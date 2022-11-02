import { supabase } from '../supabase';

const captionSearch = async (text_search, ac) => {
  const { data, error } = await supabase
    .from('shareshorts')
    .select()
    .textSearch('caption', `'${text_search}'`)
    .abortSignal(ac.signal);

  return data;
};

export { captionSearch };
