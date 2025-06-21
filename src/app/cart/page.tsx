'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart.store"
import { Trash2 } from "lucide-react"
import Heading from "@/components/Shared/Heading"
import CheckoutBtn from "@/components/Shared/CheckoutBtn"

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore()

    const total = cart.reduce((sum, item) => {
        const price = item.product.discount_percentage
            ? item.product.price * (1 - item.product.discount_percentage / 100)
            : item.product.price
        return sum + price * item.quantity
    }, 0)

    return (
        <div className="CustomeContainer py-10">
            <Heading text="Your Shopping Cart" />

            { cart.length === 0 ? (
                <div className="text-gray-600 text-center">
                    <p>Your cart is empty.</p>
                    <Link href="/products">
                        <Button variant="outline" className="mt-4">Browse Products</Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-4 mb-10">
                        { cart.map((item, index) => (
                            <div
                                key={ index }
                                className="flex flex-col md:flex-row items-start md:items-center justify-between border rounded-lg p-4 gap-4 shadow-sm"
                            >
                                <Link href={ `/products/${ item.product.id }` } className="flex items-start gap-4 w-full md:w-2/3">
                                    <Image
                                        src={ item.product.images?.[0] ?? '/assets/fallback-image.png' }
                                        alt={ item.product.title }
                                        width={ 80 }
                                        height={ 80 }
                                        className="rounded-md object-cover flex-shrink-0"
                                    />
                                    <div className="flex flex-col justify-between">
                                        <h2 className="text-base md:text-lg font-semibold">{ item.product.title }</h2>
                                        <p className="text-sm text-gray-500">Size: { item.size }</p>
                                        <p className="text-sm text-gray-500">Qty: { item.quantity }</p>
                                    </div>
                                </Link>
                                <div className="flex flex-col items-end gap-2 w-full md:w-1/3 md:items-end">
                                    <p className="text-md font-bold">
                                        ${ (
                                            item.product.discount_percentage
                                                ? item.product.price * (1 - item.product.discount_percentage / 100)
                                                : item.product.price
                                        ).toFixed(2) } x { item.quantity }
                                    </p>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={ () => removeFromCart(cart.indexOf(item)) }
                                    >
                                        <Trash2 size={ 14 } className="mr-1" /> Remove
                                    </Button>
                                </div>
                            </div>
                        )) }
                    </div>

                    <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xl font-semibold text-center md:text-left">
                            Total: <span className="text-primary">${ total.toFixed(2) }</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto justify-center md:justify-end">
                            <Button variant="outline" onClick={ clearCart } className="w-full sm:w-auto">Clear Cart</Button>
                            <CheckoutBtn />
                        </div>
                    </div>
                </>
            ) }
        </div>
    )
}
