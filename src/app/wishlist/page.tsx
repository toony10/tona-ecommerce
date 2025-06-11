import { supabaseServer } from "@/utils/supabase/SB-server";
import ProductsList from "@/components/Shared/ProductsList";
import Heading from "@/components/Shared/Heading";
import { redirect } from "next/navigation";

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

    const productIds = wishlistItems?.map(item => item.product_id) || [];

    if (productIds.length === 0) {
        return (
            <div className="px-10 py-20 text-center">
                <Heading text="Your Wishlist" />
                <p className="text-gray-500 mt-4">You have no items in your wishlist.</p>
            </div>
        );
    }

    const { data: products, error: productsError } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

    return (
        <div className="px-10 py-20">
            <Heading text="Your Wishlist" />
            <ProductsList products={ products || [] } />
        </div>
    );
}
