import CategoriesList from "@/components/CategoriesList";
import Heading from "@/components/Shared/Heading";
import ProductsList from "@/components/Shared/ProductsList";
import Slider from "@/components/Slider";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { getProducts, getCategories } from "@/actions/products";

export default async function Home() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const { products } = productsResponse ?? {};
  const { categories } = categoriesResponse ?? {};


  return (
    <div>
      <Slider />
      <div className="px-10 md:px-24 md:mx-auto m-10">
        <Heading text="Featured Products" />
        {
          products &&
          <ProductsList products={ products } />
        }
      </div>
      <div className="flex justify-end px-10 md:px-24 mt-4">
        <Link
          href="/products"
          className="text-primary border-[1px] p-3 rounded-sm border-primary text-sm font-semibold transition-colors duration-200 hover:bg-primary hover:text-white m-auto md:m-0"
        >
          Show All Products
          <MoveRight className="inline ml-2" />
        </Link>
      </div>

      <div className="mt-20">
        <Heading text="Catecories" container />
        <CategoriesList categories={ categories ?? [] } />
      </div>

    </div>
  );
}
