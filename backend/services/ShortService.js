import { supabase } from '../../backend/supabase';
import TempID from '../../tests/TempID';

const shortServices = async (ssid) => {
  const { data } = await supabase.rpc('short_services', {
    client: TempID,
    short_id: ssid,
  });

  return data;
};

export default shortServices;
