import { useQuery } from '@tanstack/react-query';

import { supabase } from '../supabase';

//* Get explore newfeed
const getExplore = async () => {
  const { data } = await supabase.from('shareshorts').select();

  return data;
};
const queryExploreFeed = () => {
  return useQuery(['explore_feed'], getExplore);
};

export { queryExploreFeed };
