import { Input } from "./ui/input"
import DropdownMenu from "./Shared/DropdownMenu"

export default function Filters() {
    return (
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 justify-between items-center gap-3">

                <Input placeholder="min price" className="w-32 rounded-full" />
                <Input placeholder="max price" className="w-32 rounded-full" />

                <DropdownMenu title="Type" subTitle='types' options={ ['men', 'womens'] } />


                <DropdownMenu title="Sizes" subTitle="sizes" options={ ['sm', 'md', 'lg', 'xl', '2xl'] } />


                <DropdownMenu title="Color" subTitle="colors" options={ ['white', 'black', 'red'] } />

                <DropdownMenu title="Category" subTitle="categories" options={ ['T-shirts', 'sutis', 'shoses', 'accecores'] } />

                <DropdownMenu title="All Filters" subTitle="all" options={ ['option1', 'option2', 'option3', 'option4'] } />
            </div>

            <div>
                <DropdownMenu title="Sort by" subTitle="sort by" options={ ['price', 'size', 'category'] } />
            </div>
        </div>
    )
}
