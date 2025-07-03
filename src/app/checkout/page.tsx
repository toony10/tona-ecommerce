'use client'
import React, { useState } from 'react';
import { useCartStore } from '@/store/cart.store';
import { useUserStore } from '@/store/user.store';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Shared/Loader';
import Aleart, { successMsg } from '@/components/Shared/Aleart';
import Heading from '@/components/Shared/Heading';

const paymentOptions = [
    { value: 'visa', label: 'Visa', icon: '/assets/visa.png' },
    { value: 'Paypaypall', label: 'Paypaypall', icon: '/assets/paypal.png' },
    { value: 'cash', label: 'Cash', icon: '/assets/cash.png' },
];

export default function CheckoutPage() {
    const { cart, clearCart, removeFromCart } = useCartStore();
    const { user } = useUserStore();
    const [shipping, setShipping] = useState({
        name: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    });
    const [payment, setPayment] = useState('visa');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const total = cart.reduce((sum, item) => {
        const price = item.product.discount_percentage
            ? item.product.price * (1 - item.product.discount_percentage / 100)
            : item.product.price;
        return sum + price * item.quantity;
    }, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate order submission
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            clearCart();
        }, 1500);
    };

    if (loading) return <Loader />;

    return (
        <main className="container mx-auto py-10 px-4 max-w-4xl">
            <Heading text='Checkout' />
            { success && (
                <Aleart
                    text="Order placed successfully! Thank you for your purchase."
                    color={ successMsg }
                    appearance={ success }
                    setMessage={ setSuccess }
                />
            ) }
            <div className="grid md:grid-cols-2 gap-8">
                {/* Shipping Form */ }
                <Card>
                    <CardHeader>
                        <CardTitle>Shipping Information</CardTitle>
                        <CardDescription>Enter your shipping details below.</CardDescription>
                    </CardHeader>
                    <form onSubmit={ handlePlaceOrder }>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name">Full Name
                                    <span className='text-red-600'>*</span>
                                </Label>
                                <Input id="name" name="name" value={ shipping.name } onChange={ handleChange } required />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" value={ shipping.email } onChange={ handleChange } />
                            </div>
                            <div>
                                <Label htmlFor="phone">
                                    Phone Number
                                    <span className='text-red-600'>*</span>
                                </Label>
                                <Input id="phone" name="phone" type="tel" value={ shipping.phone } onChange={ handleChange } required />
                            </div>
                            <div>
                                <Label htmlFor="address">
                                    Address
                                    <span className='text-red-600'>*</span>
                                </Label>
                                <Input id="address" name="address" value={ shipping.address } onChange={ handleChange } required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">
                                        City
                                        <span className='text-red-600'>*</span>
                                    </Label>
                                    <Input id="city" name="city" value={ shipping.city } onChange={ handleChange } required />
                                </div>
                                <div>
                                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                                    <Input id="zip" name="zip" value={ shipping.zip } onChange={ handleChange } />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="country">
                                    Country
                                    <span className='text-red-600'>*</span>
                                </Label>
                                <Input id="country" name="country" value={ shipping.country } onChange={ handleChange } required />
                            </div>
                            <div>
                                <Label>Payment Method</Label>
                                <div className="flex justify-between gap-4 m-2">
                                    { paymentOptions.map(option => (
                                        <label key={ option.value } className={ `flex items-center gap-2 border rounded px-3 py-2 cursor-pointer ${ payment === option.value ? 'border-primary ring-2 ring-primary' : 'border-gray-200' }` }>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value={ option.value }
                                                checked={ payment === option.value }
                                                onChange={ () => setPayment(option.value) }
                                                className="accent-primary"
                                            />
                                            <img src={ option.icon } alt={ option.label } className="w-8 h-6 object-contain" />
                                        </label>
                                    )) }
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full bg-primary text-white">Place Order</Button>
                        </CardFooter>
                    </form>
                </Card>
                {/* Order Summary */ }
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>Review your items before placing the order.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        { cart.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            cart.map((item, idx) => (
                                <div key={ idx } className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0">
                                    <img
                                        src={ item.product.images?.[0] ?? '/assets/fallback-image.png' }
                                        alt={ item.product.title }
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">{ item.product.title }</div>
                                        <div className="text-sm text-gray-500">Size: { item.size }</div>
                                        <div className="text-sm text-gray-500">Qty: { item.quantity }</div>
                                    </div>
                                    <div className="font-bold">
                                        ${ item.product.discount_percentage
                                            ? (item.product.price * (1 - item.product.discount_percentage / 100)).toFixed(2)
                                            : item.product.price.toFixed(2) }
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={ () => removeFromCart(idx) }
                                        className="ml-2"
                                        type="button"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))
                        ) }
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t pt-4">
                        <span className="font-semibold">Total</span>
                        <span className="text-lg font-bold">${ total.toFixed(2) }</span>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
} 