import CategoriesList from "@/components/CategoriesList";
import Heading from "@/components/Shared/Heading";
import ProductsList from "@/components/Shared/ProductsList";
import Slider from "@/components/Slider";
import { supabaseServer } from "@/utils/supabase/SB-server";
export default async function Home() {
  const supabase = await supabaseServer();

  const { data: products } = await supabase.from('products').select('*').limit(4);
  const { data: categories } = await supabase.from('categories').select('*');
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

      <div className="mt-20">
        <Heading text="Catecories" container />
        <CategoriesList categories={ categories ?? [] } />
      </div>

    </div>
  );
}
