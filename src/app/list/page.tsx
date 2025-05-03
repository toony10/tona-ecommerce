import Filters from "@/components/Filters"
import ProductsList from "@/components/ui/ProductsList"
import Heading from "@/components/Shared/Heading"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function List() {
    return (
        <div className='px-10 md:px-24 relative'>
            {/* CAMOING */ }
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
                <Heading text="Shose for you!" />
                <div className="flex flex-col gap-10 items-center md:items-stretch">
                    <ProductsList />
                    <ProductsList />
                    <ProductsList />
                    <ProductsList />
                </div>
            </div>
        </div>
    )
}
