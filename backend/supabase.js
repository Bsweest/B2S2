import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const url = 'https://utpupcffsaillsgoohtt.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cHVwY2Zmc2FpbGxzZ29vaHR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTg1MzY0OCwiZXhwIjoxOTc3NDI5NjQ4fQ.Bg5Kh0oKqLVA-MUcry0EG6Kbfgd_MbffIN08ykUIoWs'

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})