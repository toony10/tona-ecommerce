export interface Product {
  id: string;
  title: string;
  description: string | null;
  images: string[] | null;
  price: number;
  discount_percentage: number | null;
  stock: number;
  sold_count: number;
  category_id: string | null;
  created_at: string | null;
}

export interface Category {
  id: string;
  name: string;
  image: string | null;
  created_at: string | null;
}
