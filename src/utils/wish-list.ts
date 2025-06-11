import { redirect } from 'next/navigation';
import { supabaseClient } from './supabase/SB-client';

export async function addToWishlist(productId: string) {
  const supabase = supabaseClient;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/register');
  }

  await supabase.from('wishlist').insert({
    user_id: user.id,
    product_id: productId,
  });
}

export async function removeFromWishlist(productId: string) {
  const supabase = supabaseClient;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from('wishlist').delete().match({ user_id: user.id, product_id: productId });
}

export async function getWishlist() {
  const supabase = supabaseClient;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase.from('wishlist').select('product_id');

  return data?.map((item) => item.product_id) ?? [];
}
