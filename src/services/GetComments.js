import { supabase } from "../../backend/supabase";

const getComments = async (ssid, pid, abort) => {
    const { data } = await supabase.from('comments')
        .select()
        .match({
            ssid: ssid,
            parent_id: pid,
        })
        .order('count_heart', { ascending: false })
        .abortSignal(abort);

    return data;
} 

export default getComments