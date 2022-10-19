import { supabase } from "../../backend/supabase";

import TempID from "../../tests/TempID";

const shortServices = async(ssid, op_id) => {
   const { data } = await supabase.rpc('short_services', {
      client: TempID,
      short_id: ssid,
      op_id: op_id
   });

   return data;
}

export default shortServices;