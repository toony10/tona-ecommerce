'use client';

import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/lib/ConvertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '@/store/cart.store'
import Link from 'next/link';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import priceAfterDiscount from '@/lib/priceAfterDiscount';

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


export default function Checkout() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore()

    const amountAfterDiscount = cart.reduce((sum, item) => {
        const price = item.product.discount_percentage
            ? priceAfterDiscount(item.product.price, item.product.discount_percentage)
            : item.product.price;
        return sum + price * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center px-4">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag size={ 36 } className="text-gray-400 md:w-12 md:h-12" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md text-sm md:text-base">
                Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link href="/products" className=" custom-pointer z-50">
                <Button size="lg" className="px-6 md:px-8 py-3 w-full sm:w-auto font-bold text-lg text-blue-500">
                    Explore Products
                </Button>
            </Link>
        </div>
    }
    return (
        <main className='flex flex-col md:flex-row px-5 items-center justify-between gap-5'>
            <div className="lg:col-span-2 space-y-4">
                { cart.map((item, index) => (
                    <div
                        key={ index }
                        className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                    >
                        <div className="flex gap-4 md:gap-6">
                            <Link href={ `/products/${ item.product.id }` } className="relative">
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-lg md:rounded-xl overflow-hidden bg-gray-100 group">
                                    <Image
                                        unoptimized
                                        src={ item.product.images?.[0] ?? '/assets/fallback-image.png' }
                                        alt={ item.product.title }
                                        fill
                                        className="object-cover transition-all duration-300 rounded-xs group-hover:rounded-lg group-hover:shadow-lg"
                                    />
                                </div>
                                { item.product.discount_percentage ? (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full font-bold">
                                        -{ item.product.discount_percentage }%
                                    </div>
                                ) : '' }
                            </Link>

                            <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
                                <Link href={ `/products/${ item.product.id }` }>
                                    <h3 className="font-semibold text-sm md:text-lg text-gray-900 hover:text-primary transition-colors line-clamp-2">
                                        { item.product.title }
                                    </h3>
                                </Link>

                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-gray-100 px-2 py-1 rounded-full text-xs md:text-sm text-gray-600">
                                        Size: { item.size }
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    { item.product.discount_percentage ? (
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm font-bold'>${ (priceAfterDiscount(item.product.price, item.product.discount_percentage) * item.quantity).toFixed(2) }</span>
                                            <span className='text-xs font-bold text-gray-500 line-through'>${ (item.product.price * item.quantity).toFixed(2) }</span>
                                        </div>
                                    ) : (<div className='flex flex-col gap-1'>
                                        <span className='text-sm font-bold'>${ (item.product.price * item.quantity).toFixed(2) }</span>
                                    </div>) }

                                    <div className="flex items-center justify-between">
                                        <div className='flex items-center gap-2'>
                                            <span className="text-sm text-gray-600">
                                                Qty: { item.quantity }
                                            </span>
                                            <span className='flex items-center gap-2'>
                                                <button className='text-sm font-bold bg-gray-200 rounded-full p-1 w-6 h-6 flex items-center justify-center cursor-pointer' onClick={ () => increaseQuantity(index) }>+</button>
                                                <button className='text-sm font-bold bg-gray-200 rounded-full p-1 w-6 h-6 flex items-center justify-center cursor-pointer' onClick={ item.quantity === 1 ? () => removeFromCart(cart.indexOf(item)) : () => decreaseQuantity(index) }>-</button>
                                            </span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 h-8 w-8 cur"
                                            onClick={ () => removeFromCart(cart.indexOf(item)) }
                                        >
                                            <Trash2 size={ 14 } />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
            <div className='flex items-center justify-center m-auto'>
                <Elements
                    stripe={ stripePromise }
                    options={ {
                        mode: 'payment',
                        amount: convertToSubcurrency(amountAfterDiscount),
                        currency: 'usd',
                    } }
                >
                    <CheckoutPage amount={ amountAfterDiscount } />
                </Elements>
            </div>
        </main>
    )
}
