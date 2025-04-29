import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export default function ProductCard() {
    return (
        <div className="w-60 flex flex-col">
            <Link href='/test'>
                <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                    <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 350 } alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms]" />
                    <Image src='https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 250 } sizes="100vh" alt="product" className=" rounded-md" />
                </div>
            </Link>
            <div className="p-0.5">
                <div className="flex items-center justify-between w-full">
                    <span className="font-bold">Black T-shirt</span>
                    <span className="text-sm font-semibold">12.99$</span>
                </div>
                <p className="font-semibold text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <Button className="w-24 rounded-full border-[1px] border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
            </div>
        </div>
    )
}
