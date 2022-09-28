import { supabase } from "../../backend/supabase";

const getExplore = async () => {
    const { data } = await supabase.from('shareshorts').select();

    return data;
} 

export default getExplore