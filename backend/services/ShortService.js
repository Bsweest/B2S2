import { supabase } from '../../backend/supabase';
import { clientID } from '../../src/global/ClientProfile';

const shortServices = async (ssid) => {
  const client = clientID.get();

  const { data } = await supabase.rpc('short_services', {
    client: client,
    short_id: ssid,
  });

  return data;
};

export default shortServices;
