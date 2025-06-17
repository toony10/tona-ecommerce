'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/utils/supabase/SB-client';
import ProductsList from "@/components/Shared/ProductsList";
import Heading from "@/components/Shared/Heading";
import Link from "next/link";
import { useWishlistStore } from '@/store/wishlist.store';
import { Product } from '@/types';

export default function WishlistClient() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { wishlistItems } = useWishlistStore();

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (wishlistItems.length === 0) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabaseClient
                    .from("products")
                    .select("*")
                    .in("id", wishlistItems);

                if (error) {
                    console.error("Error fetching wishlist products:", error);
                } else {
                    setProducts(data || []);
                }
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProducts();
    }, [wishlistItems]);

    if (loading) {
        return (
            <div className="px-10 py-20 text-center">
                <Heading text="Your Wishlist" />
                <p className="text-gray-500 mt-4">Loading your wishlist...</p>
            </div>
        );
    }

    if (wishlistItems.length === 0) {
        return (
            <div className="px-10 py-20 text-center">
                <Heading text="Your Wishlist" />
                <p className="text-gray-500 mt-4">You have no items in your wishlist.</p>
                <Link href="/products" className="text-blue-500 hover:underline mt-4">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="px-10 py-20">
            <Heading text="Your Wishlist" />
            <ProductsList products={ products } />
        </div>
    );
} 