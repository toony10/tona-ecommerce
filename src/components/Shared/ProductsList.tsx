import ProductCard from "./ProductCard"
import { Product } from "@/types"

type Props = {
    products: Product[]
}

export default function ProductsList({ products }: Props) {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-center">
            { products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={ product.id } { ...product } />
                ))
            ) : (
                <p>No products</p>
            ) }
        </div>
    )
}
