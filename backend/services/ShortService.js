import { supabase } from "../../backend/supabase";

const shortServices = async(clientID , ssid, op_id) => {
   const { data } = await supabase.rpc('short_services', {
      client: clientID,
      short_id: ssid,
      op_id: op_id
   });

   return data;
}

export default shortServices;