'use server';

import { supabaseServer } from '../utils/supabase/SB-server';
export async function getFilteredProducts({
  minPrice,
  maxPrice,
  category,
  search,
}: {
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  search?: string;
}) {
  const supabase = await supabaseServer();
  let query = supabase.from('products').select('*');

  if (minPrice) {
    query = query.gte('price', parseFloat(minPrice));
  }

  if (maxPrice) {
    query = query.lte('price', parseFloat(maxPrice));
  }

  if (category) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('name', category)
      .single();

    if (categoryData?.id) {
      query = query.eq('category_id', categoryData.id);
    } else {
      // لو الكاتيجوري مش موجود، رجع نتائج فاضية
      return { products: [], error: null };
    }
  }

  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  const { data, error } = await query;

  return { products: data || [], error: error?.message };
}
