import { supabase } from "../../backend/supabase";

const isStatement = async(clientID , ssid) => {
   const { data: heart } = await supabase.rpc('is_heart_short', {
      client: clientID,
      short_id: ssid
   });
  

   const { data: bm } = await supabase.rpc('is_bookmark', {
      client: clientID,
      short_id: ssid
   });

   const full = [heart, bm];

   return full;
}

export default isStatement;