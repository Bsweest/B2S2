import { supabase } from "../../backend/supabase";

const shortServices = async(clientID , ssid) => {
   const { data } = await supabase.rpc('short_services', {
      client: clientID,
      short_id: ssid
   });

   return data;
}

export const getCountAllComment = async (ssid) => {
   const { count, error } = await supabase.from('comments')
      .select('*', { count: 'exact' })
      .eq('ssid', ssid);

    return count;
}

export default shortServices;