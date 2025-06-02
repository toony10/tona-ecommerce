'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

export default function CartModel() {
    const router = useRouter()

    return (
        <DropdownMenuContent className='p-0  m-5 w-72'>
            <div className='p-2 text-xl font-bold text-center'>Shopping Cart</div>
            {/* ITEM */ }
            <div className='flex w-full items-center gap-5 p-2 '>
                <div className='w-1/3'>
                    <Image src='/assets/product.png' alt='cart' width={ 80 } height={ 80 } className='rounded-sm' />
                </div>
                <div className='flex flex-col justify-between gap-2 p-2 h-full w-full'>
                    <div className='flex items-center justify-between'>
                        <div className='text-md'>Name</div>
                        <div className='text-sm font-bold'>Price</div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='text-md'>Qty: 1</div>
                        <div className='text-red-700 text-sm w-12 cursor-pointer'>Remove</div>
                    </div>
                </div>
            </div>

            <DropdownMenuSeparator className='m-1' />
            <div className='flex items-center justify-between p-2'>
                <div className='text-md'>Total</div>
                <div className='text-sm text-center font-bold'>$ 100.00</div>
            </div>
            <p className='text-center text-sm px-1 text-gray-500 font-semibold'>Shipping and taxes calculated at checkout</p>
            <div className='flex items-center justify-between p-2'>
                <Button className='bg-white text-black border cursor-pointer' onClick={ () => router.push('/cart') }>View Cart</Button>
                <Button className='bg-primary cursor-pointer' onClick={ () => router.push('/checkOut') }>Check out</Button>
            </div>
        </DropdownMenuContent>
    )
}
