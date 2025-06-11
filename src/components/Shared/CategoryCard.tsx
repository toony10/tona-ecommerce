import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/types'

export default function CategoryCard(category: Category) {
    return (
        <Link href={ `/products?category=${ category.name }` } className='shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
            <div className="relative bg-slate-100 w-full h-96 overflow-hidden">
                <Image
                    src={ category.image ?? './assets/fallback-image.png' }
                    alt="category"
                    fill
                    sizes="100vw"
                    className="object-cover rounded-xs transition-transform duration-300 ease-in-out hover:scale-125"
                />
            </div>
            <h1 className='mt-5 font-light text-xl tracking-wider px-2'>{ category.name }</h1>
        </Link>
    )
}
