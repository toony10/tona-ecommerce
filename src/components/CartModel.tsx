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
import CheckoutBtn from './Shared/CheckoutBtn'
import { useUserStore } from '@/store/user.store'
import priceAfterDiscount from '@/lib/priceAfterDiscount'

interface CartModelProps {
    closeCart: () => void;
}

export default function CartModel({ closeCart }: CartModelProps) {
    const { cart, removeFromCart } = useCartStore()
    const { user } = useUserStore();

    const total = cart.reduce((sum, item) => {
        const price = item.product.discount_percentage
            ? priceAfterDiscount(item.product.price, item.product.discount_percentage)
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
                            <div className='w-1/3 relative'>
                                <Image unoptimized
                                    src={ item.product.images?.[0] ?? '/assets/fallback-image.png' }
                                    alt={ item.product.title }
                                    width={ 80 }
                                    height={ 80 }
                                    className='rounded-sm object-cover'
                                />
                                { item.product.discount_percentage ? (
                                    <div className='absolute -top-2 -right-4'>
                                        <span className='bg-red-500 text-white text-xs px-1 py-1 rounded-full font-bold'>
                                            - { item.product.discount_percentage }%
                                        </span>
                                    </div>
                                ) : '' }
                            </div>
                            <div className='flex flex-col justify-between gap-2 p-2 h-full w-full'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-sm font-semibold line-clamp-2'>{ item.product.title }</div>

                                    { item.product.discount_percentage ? (
                                        <div className='flex flex-col items-center gap-1'>
                                            <span className='text-sm font-bold'>${ (priceAfterDiscount(item.product.price, item.product.discount_percentage) * item.quantity).toFixed(2) }</span>
                                            <span className='text-xs font-bold text-gray-500 line-through'>${ (item.product.price * item.quantity).toFixed(2) }</span>
                                        </div>
                                    ) : (<div className='flex flex-col items-center gap-1'>
                                        <span className='text-sm font-bold'>${ (item.product.price * item.quantity).toFixed(2) }</span>
                                    </div>) }

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

                        <Link href='/cart' >
                            <Button className='text-gray-950 bg-gray-100 border-2 border-gray-200 cursor-pointer' onClick={ closeCart }>
                                View Cart
                            </Button>
                        </Link>

                        { user ? (
                            <CheckoutBtn onClick={ closeCart } />
                        ) : (
                            <CheckoutBtn />
                        ) }
                    </div>
                </>
            ) }
        </DropdownMenuContent>
    )
}
