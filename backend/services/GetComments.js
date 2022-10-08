import { supabase } from "../../backend/supabase";

const getComments = async (ssid, pid, ac) => {
    const { data, error } = await supabase.rpc('get_comments', {
        ss_id: ssid,
        p_id: pid
    })
    .abortSignal(ac.signal);

    return data;
} 

const isHeartComment = async (clientID , cid) => {
    const { data, error } = await supabase.rpc('is_heart_comment', {
        client: clientID,
        comment_id: cid
    })

    return data;
}

const getCountChildComment = async (pid) => {
    const { count, error } = await supabase.from('comments')
        .select('*', { count: 'exact' })
        .eq('parent_id', pid);

    return count;
}

export {
    getComments,
    isHeartComment,
    getCountChildComment
}