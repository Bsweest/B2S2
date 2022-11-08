import { useQuery } from '@tanstack/react-query';

import { supabase } from '../supabase';

const captionSearch = async (text_search, ac) => {
  const { data, error } = await supabase
    .from('shareshorts')
    .select()
    .textSearch('caption', `'${text_search}'`)
    .abortSignal(ac.signal);

  return data;
};

const querySeachShorts = (text_search, ac) => {
  return useQuery(
    ['search_caption', text_search],
    () => captionSearch(text_search, ac),
    {
      staleTime: 60000,
    },
  );
};

export default querySeachShorts;
