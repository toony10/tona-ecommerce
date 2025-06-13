import ProductCard from "./ProductCard"
import { Product } from "@/types"

type Props = {
    products: Product[]
}

export default function ProductsList({ products }: Props) {
    return (
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            { products.length > 0 ? (
                products.map((product) => (
                    <div key={ product.id } className="flex justify-center">
                        <ProductCard key={ product.id } { ...product } />
                    </div>
                ))
            ) : (
                <p>No products</p>
            ) }
        </div>
    );
}
