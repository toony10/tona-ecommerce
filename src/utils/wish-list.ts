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
  if (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }

  return data?.map((item) => item.product_id) ?? [];
}

// Sync local wishlist to Supabase when user logs in
export async function syncLocalWishlistToSupabase(localWishlistItems: string[]) {
  const supabase = supabaseClient;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || localWishlistItems.length === 0) return;

  try {
    // Get existing wishlist items to avoid duplicates
    const { data: existingItems } = await supabase
      .from('wishlist')
      .select('product_id')
      .eq('user_id', user.id);

    const existingProductIds = existingItems?.map((item) => item.product_id) || [];

    // Filter out items that already exist in Supabase
    const newItems = localWishlistItems.filter((id) => !existingProductIds.includes(id));

    if (newItems.length > 0) {
      // Insert new items
      const wishlistData = newItems.map((productId) => ({
        user_id: user.id,
        product_id: productId,
      }));

      await supabase.from('wishlist').insert(wishlistData);
    }
  } catch (error) {
    console.error('Error syncing wishlist to Supabase:', error);
  }
}
