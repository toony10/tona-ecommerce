import CategoryCard from "./Shared/CategoryCard"
import { Category } from "@/types"

type Props = {
    categories: Category[]
}
export default function CategoriesList({ categories }: Props) {
    return (
        <div className='p-4 overflow-x-scroll scrollbar-custom'>
            <div className='flex gap-4 md:gap-8'>
                { categories.length > 0 && categories.map((category) => (
                    <CategoryCard key={ category.id } { ...category } />
                )) }
            </div>
        </div>
    )
}
