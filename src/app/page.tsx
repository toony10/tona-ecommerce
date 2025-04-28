import FeaturedProducts from "@/components/ProductsList";
import ProductsList from "@/components/ProductsList";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div>
      <Slider />

      <div className="px-10 md:px-24 m-10">
        <h1 className='text-3xl font-semibold text-gray-950 mb-12 text-center md:text-start'>Featured Products</h1>
        <ProductsList />
      </div>
    </div>
  );
}
