import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import ProductCard from "./Shared/ProductCard"
export default function ProductsList() {
    return (

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-center">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )
}
