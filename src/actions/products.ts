'use server';

import { supabaseServer } from '../utils/supabase/SB-server';

export async function getProducts() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    return { products: [], error: error.message };
  }
  return { products: data, error: null };
}
export async function getCategories() {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    return { categories: [], error: error.message };
  }
}

function calculateDiscountedPrice(price: number, discountPercentage: number | null): number {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
}

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
  let query = supabase.from('products').select('*, discount_percentage');

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

  if (error) {
    return { products: [], error: error.message };
  }

  // Filter products based on discounted prices
  let filteredProducts = data || [];

  if (minPrice) {
    const minPriceNum = parseFloat(minPrice);
    filteredProducts = filteredProducts.filter(
      (product) =>
        calculateDiscountedPrice(product.price, product.discount_percentage) >= minPriceNum,
    );
  }

  if (maxPrice) {
    const maxPriceNum = parseFloat(maxPrice);
    filteredProducts = filteredProducts.filter(
      (product) =>
        calculateDiscountedPrice(product.price, product.discount_percentage) <= maxPriceNum,
    );
  }

  return { products: filteredProducts, error: null };
}
