import { supabaseServer } from '@/utils/supabase/SB-server';

export async function getUser() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    return { user: null, error: error.message };
  }
  return { user: data, error: null };
}
