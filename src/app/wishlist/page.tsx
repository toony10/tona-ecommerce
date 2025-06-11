import { supabaseServer } from "@/utils/supabase/SB-server";
import ProductsList from "@/components/Shared/ProductsList";
import Heading from "@/components/Shared/Heading";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function WishlistPage() {
    const supabase = await supabaseServer();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/register");
    }

    const { data: wishlistItems, error: wishlistError } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

    if (wishlistError) {
        console.error("Error fetching wishlist:", wishlistError);
        return <div className="px-10 py-20 text-center">Error loading wishlist.</div>;
    }

    const productIds = wishlistItems?.map(item => item.product_id) || [];

    if (productIds.length === 0) {
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

    const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

    if (productsError) {
        console.error("Error fetching products for wishlist:", productsError);
        return <div className="px-10 py-20 text-center">Error loading wishlist products.</div>;
    }

    return (
        <div className="px-10 py-20">
            <Heading text="Your Wishlist" />
            <ProductsList products={ products || [] } />
        </div>
    );
}
