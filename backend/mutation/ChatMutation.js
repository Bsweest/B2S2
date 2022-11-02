import { supabase } from "../supabase";

import { clientID } from "../../src/global/ClientProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addChat = async (props) => {
    const { content, room_id } = props;
    const sender = clientID.get();

    const { data, error } = await supabase
        .from('messages')
        .insert({ 
            content: content,
            sender: sender,
            room_id: room_id
        })
        .single();
    
    return data;
}

const mutateChat = () => {
    const queryClient = useQueryClient();

    return useMutation(addChat, {
        onSuccess: ( data, variables ) => {
            
        }
    });
}

export default mutateChat;