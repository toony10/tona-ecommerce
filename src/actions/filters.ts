'use server';

import { supabaseServer } from '../utils/supabase/SB-server';

export async function getFilters() {
  const supabase = await supabaseServer();

  const [categoriesResponse, sizesResponse] = await Promise.all([
    supabase.from('categories').select('name'),
    supabase.from('sizes').select('name'),
  ]);

  return {
    categories: categoriesResponse.data?.map((cat) => cat.name) || [],
    sizes: sizesResponse.data?.map((size) => size.name) || [],
  };
}
