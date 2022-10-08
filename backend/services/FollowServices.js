import { supabase } from "../supabase";

export const isFollowedOP = async (clientID , opID) => {
    const { data } = await supabase.rpc('is_followed_op', {
        client: clientID,
        op_id: opID
    })

    return data;
}