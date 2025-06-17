'use client'
import Image from 'next/image'
import { Button } from './ui/button'
import {
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { useCartStore } from '@/store/cart.store'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CartModel() {
    const { cart, removeFromCart } = useCartStore()

    const total = cart.reduce((sum, item) => {
        const price = item.product.discount_percentage
            ? item.product.price * (1 - item.product.discount_percentage / 100)
            : item.product.price
        return sum + price * item.quantity
    }, 0)

    return (
        <DropdownMenuContent className='p-0 m-5 w-80'>
            <div className='p-2 text-xl font-bold text-center'>Shopping Cart</div>
            <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto'>
                { cart.length === 0 ? (
                    <div className='p-5 text-center text-gray-500'>Your cart is empty.</div>
                ) : (
                    cart.map((item, index) => (
                        <div key={ index } className='flex w-full items-center gap-5 p-2'>
                            <div className='w-1/3'>
                                <Image
                                    src={ item.product.images?.[0] ?? '/assets/fallback-image.png' }
                                    alt={ item.product.title }
                                    width={ 80 }
                                    height={ 80 }
                                    className='rounded-sm object-cover'
                                />
                            </div>
                            <div className='flex flex-col justify-between gap-2 p-2 h-full w-full'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-sm font-semibold line-clamp-2'>{ item.product.title }</div>
                                    <div className='text-sm font-bold'>
                                        ${ item.product.discount_percentage
                                            ? (item.product.price * (1 - item.product.discount_percentage / 100)).toFixed(2)
                                            : item.product.price.toFixed(2) }
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-xs text-gray-600'>
                                    <div>Qty: { item.quantity }</div>
                                    <div>Size: { item.size }</div>
                                    <div
                                        className='text-red-700 cursor-pointer flex items-center gap-1'
                                        onClick={ () => removeFromCart(cart.indexOf(item)) }
                                    >
                                        <Trash2 size={ 14 } /> Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) }
            </div>
            <DropdownMenuSeparator className='m-1' />
            { cart.length > 0 && (
                <>
                    <div className='flex items-center justify-between p-2'>
                        <div className='text-md'>Total</div>
                        <div className='text-sm font-bold'>${ total.toFixed(2) }</div>
                    </div>
                    <p className='text-center text-sm px-1 text-gray-500 font-semibold'>
                        Shipping and taxes calculated at checkout
                    </p>
                    <div className='flex items-center justify-between p-2'>
                        <Link href='/cart'>
                            <Button className='bg-white text-black border cursor-pointer'>
                                View Cart
                            </Button>
                        </Link>
                        <Link href='/checkOut'>
                            <Button className='bg-primary cursor-pointer'>
                                Check out
                            </Button>
                        </Link>
                    </div>
                </>
            ) }
        </DropdownMenuContent>
    )
}
