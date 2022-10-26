import { supabase } from "../supabase"

import TempID from "../../tests/TempID"

const getChatRooms = async() => {
    const { data, error } = await supabase.rpc('get_chatrooms', {
        client: TempID
    })

    return data;
}

const getLastMessage = async(room_id) => {
    const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('room_id', room_id)
        .order('created_at', { ascending: false })
        .limit(1).single();

    return data;
}

const getInfiniteMessages = async(room_id) => {
    const { data, error } = await supabase
        .from('messages')
        .select()
        .eq('room_id', room_id)
        .order('created_at', { ascending: false });

    return data;
}


export { getChatRooms, getLastMessage, getInfiniteMessages }