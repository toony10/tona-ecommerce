import Filters from "@/components/Filters"
import ProductsList from "@/components/Shared/ProductsList"
import Heading from "@/components/Shared/Heading"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getFilteredProducts } from "@/actions/products"

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default async function ProductsPage({ searchParams }: PageProps) {
    const { products, error } = await getFilteredProducts({
        minPrice: searchParams.minPrice as string,
        maxPrice: searchParams.maxPrice as string,
        category: searchParams.category as string,
    });

    return (
        <div className='px-10 md:px-24 relative'>
            {/* CAMPAIGN */ }
            <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-80">
                <div className="w-2/3 flex flex-col items-center justify-center gap-8">
                    <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
                        Grab up to 50% off on
                        <br /> Selected Products
                    </h1>
                    <Button className="rounded-3xl bg-pink-500 text-white py-3 px-5 text-sm cursor-pointer">
                        Buy Now
                    </Button>
                </div>
                <div className="relative w-1/3">
                    <Image src="/assets/woman.png" alt="" fill className="object-contain" />
                </div>
            </div>

            {/* Filters */ }
            <Filters />

            {/* PRODUCTS */ }
            <div className="mt-16">
                <Heading text="Discover Your Next Favorite Pair!" />
                <div className="flex flex-col gap-10 items-center md:items-stretch">
                    { error ? (
                        <p className="text-red-500 text-center">Error loading products: { error }</p>
                    ) : (
                        <ProductsList products={ products } />
                    ) }
                </div>
            </div>
        </div>
    )
}