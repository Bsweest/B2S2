import { supabase } from "../../backend/supabase";

const getComments = async (ssid, pid, ac) => {
    if(!pid) {
        const { data } = await supabase.from('comments')
            .select()
            .eq('ssid', ssid)
            .is('parent_id', null)
            .abortSignal(ac.signal);

        return data;
    }

    else {
        const { data } = await supabase.from('comments')
            .select()
            .match({
                ssid: ssid,
                parent_id: pid,
            })
            .abortSignal(ac.signal);

        return data;
    }
} 

const isHeartComment = async (clientID , cid) => {
    const { data } = await supabase.rpc('is_heart_comment', {
        client: clientID,
        comment_id: cid
    })

    return data;
}

const getCountComment = async (pid) => {
    const { data, count, error } = await supabase.from('comments')
        .select('*', { count: 'exact' })
        .eq('parent_id', pid)
}