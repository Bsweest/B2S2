import { useQuery } from '@tanstack/react-query';

import { supabase } from '../../backend/supabase';
import { clientID } from '../../src/global/ClientProfile';

/**
 * @param ssid
 * @returns {bm, hs, count_heart, count_comment}
 */
const shortServices = async (ssid) => {
  const client = clientID.get();

  const { data } = await supabase.rpc('short_services', {
    client: client,
    short_id: ssid,
  });

  return data;
};
const queryShortServices = (ssid) => {
  return useQuery(['short_services', ssid], () => shortServices(ssid));
};

export default queryShortServices;
