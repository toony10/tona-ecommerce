import CategoriesList from "@/components/CategoriesList";
import Heading from "@/components/Shared/Heading";
import FeaturedProducts from "@/components/ProductsList";
import ProductsList from "@/components/ProductsList";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div>
      <Slider />

      <div className="px-10 md:px-24 md:mx-auto m-10">
        <Heading text="Featured Products" />
        <ProductsList />
      </div>

      <div className="mt-20">
        <Heading text="Catecories" container />
        <CategoriesList />
      </div>

    </div>
  );
}
