import WishlistClient from "@/components/WishlistClient";

export default async function WishlistPage() {
    // Always render the client-side component which uses the Zustand store.
    return <WishlistClient />;
}
