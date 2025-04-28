import FeaturedProducts from "@/components/FeaturedProducts";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div>
      <Slider />
      <ProductList />
      <FeaturedProducts />
    </div>
  );
}
