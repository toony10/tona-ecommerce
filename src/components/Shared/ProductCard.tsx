import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function ProductCard() {
    return (
        <div className="w-full flex flex-col">
            <Link href='/test'>
                <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                    <Image src='https://images.pexels.com/photos/868110/pexels-photo-868110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' fill alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms] object-cover" />
                    <Image src='https://images.pexels.com/photos/8251006/pexels-photo-8251006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' fill sizes="100vh" alt="product" className='object-cover' />
                </div>
            </Link>
            <div className="p-0.5">
                <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">Black T-shirt</span>
                    <span className="text-sm font-semibold text-gray-900">12.99$</span>
                </div>
                <p className=" text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
            </div>
        </div>
    )
}
