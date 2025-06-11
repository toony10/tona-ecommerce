import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Product } from '@/types'

export default function ProductCard(product: Product) {
    return (
        <div className="w-full flex flex-col">
            <Link href={ `/products/${ product.id }` } className="relative w-full h-72 mb-4">
                <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                    { product.discount_percentage && product.discount_percentage > 0 && (
                        <div className="absolute top-2 left-2 z-20 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            { product.discount_percentage }% OFF
                        </div>
                    ) }
                    <Image src={ product.images?.[0] ?? './assets/fallback-image.png' } fill alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms] object-cover" />
                    <Image src={ product.images?.[1] ?? './assets/fallback-image.png' } fill sizes="100vh" alt="product" className='object-cover' />
                </div>
            </Link>
            <div className="p-0.5 flex flex-col gap-2">
                <div className="flex items-center justify-between w-full min-h-12">
                    <div className="font-semibold">{ product.title }</div>
                    { (product.discount_percentage ?? 0) > 0 ? (
                        <div className="text-sm font-semibold text-gray-900 flex flex-col items-center gap-2">
                            <span className="mr-2">
                                { product.discount_percentage
                                    && (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
                                }$
                            </span>
                            <span className="line-through text-gray-500">
                                { product.price.toFixed(2) }$
                            </span>
                        </div>
                    ) :
                        (
                            <div className="text-sm font-semibold text-gray-900">
                                <span>
                                    { product.price.toFixed(2) }$
                                </span>
                            </div>
                        )
                    }
                </div>
                <p className=" text-gray-600 line-clamp-2">{ product.description }</p>
                <div className='flex items-center justify-between pt-2'>
                    <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart
                    </Button>
                </div>
            </div>
        </div>
    )
}
