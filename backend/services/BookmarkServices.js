import { supabase } from "../supabase";

export const isBookmark = async (clientID , ssid) => {
    const { data } = await supabase.rpc('is_bookmark', {
        client: clientID,
        short_id: ssid
    })

    return data;
}