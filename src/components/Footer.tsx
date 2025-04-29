import React from 'react'
import Logo from './Shared/Logo'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from './ui/input'
import { Button } from './ui/button'


export default function Footer() {
    return (
        <div className='p-10 md:p-24 mt-28 bg-gray-200'>
            {/* TOP */ }
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20'>
                {/* COL */ }
                <div className='flex flex-col gap-10'>
                    <Logo />
                    <ul className='flex flex-col gap-7'>
                        <li>
                            <p>
                                3252 Winding Way, Central Plaza, Willowbrook, CA 90210, United
                                States
                            </p>
                        </li>
                        <li className='font-bold'>
                            <Link href='mailto:hello@tona.dev'>hello@tona.dev</Link>
                        </li>
                        <li className='font-bold'>
                            <Link href='tel:+1 234 567 890'>
                                +1 234 567 890
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* COL */ }
                <div className='flex flex-col gap-10'>
                    <h1 className='text-lg tracking-tight min-h-11 font-bold'>COMPANY</h1>
                    <ul className='flex flex-col justify-between gap-9'>
                        <li className='h-7'></li>
                        <li>
                            <Link href=''>About Us</Link>
                        </li>
                        <li>
                            <Link href=''>Careers</Link>
                        </li>
                        <li>
                            <Link href=''>Affiliates</Link>
                        </li>
                        <li>
                            <Link href=''>Blog</Link>
                        </li>
                        <li>
                            <Link href=''>Contact Us</Link>
                        </li>
                    </ul>
                </div>
                {/* COL */ }
                <div className='flex flex-col gap-10'>
                    <h1 className='text-lg tracking-tight min-h-11 font-bold'>SHOP</h1>
                    <ul className='flex flex-col justify-between gap-9'>
                        <li className='h-7'></li>
                        <li>
                            <Link href=''>New Arrivals</Link>
                        </li>
                        <li>
                            <Link href=''>Accessories</Link>
                        </li>
                        <li>
                            <Link href=''>Men</Link>
                        </li>
                        <li>
                            <Link href=''>Women</Link>
                        </li>
                        <li>
                            <Link href=''>All Products</Link>
                        </li>
                    </ul>
                </div>
                {/* COL */ }
                <div className='flex flex-col gap-10'>
                    <h1 className='text-lg tracking-tight min-h-11 font-bold'>HELP</h1>
                    <ul className='flex flex-col justify-between gap-9'>
                        <li className='h-7'></li>
                        <li>
                            <Link href=''>Customer Service</Link>
                        </li>
                        <li>
                            <Link href=''>My Account</Link>
                        </li>
                        <li>
                            <Link href=''>Find a Store</Link>
                        </li>
                        <li>
                            <Link href=''>Legal & Privacy</Link>
                        </li>
                        <li>
                            <Link href=''>Gift Card</Link>
                        </li>
                    </ul>
                </div>
                {/* COL */ }
                <div className='flex flex-col gap-10'>
                    <h1 className='text-lg tracking-tight min-h-11 font-bold'>SUBSCRIBE</h1>
                    <ul className='flex flex-col justify-between gap-9'>
                        <li>
                            <p> Be the first to get the latest news about trends, promotions, and
                                much more!</p>
                        </li>
                        <li className='h-12 flex'>
                            <Input placeholder='Email address' className='rounded-none bg-white h-full' />
                            <Button className='bg-red-500 rounded-none h-full'>JOIN</Button>
                        </li>
                        <li className='font-bold tracking-tight'>
                            Secure Payments
                        </li>
                        <li className='flex gap-2.5'>
                            <Image src="/assets/discover.png" sizes='100vh' alt="" width={ 45 } height={ 20 } className='cursor-pointer' />
                            <Image src="/assets/skrill.png" sizes='100vh' alt="" width={ 45 } height={ 20 } className='cursor-pointer' />
                            <Image src="/assets/paypal.png" sizes='100vh' alt="" width={ 45 } height={ 20 } className='cursor-pointer' />
                            <Image src="/assets/mastercard.png" sizes='100vh' alt="" width={ 45 } height={ 20 } className='cursor-pointer' />
                            <Image src="/assets/visa.png" sizes='100vh' alt="" width={ 45 } height={ 20 } className='cursor-pointer' />
                        </li>
                    </ul>
                </div>
            </div>

            {/* BOTTOM */ }
            <div className='flex flex-col md:flex-row text-center justify-between mt-15'>
                <div className='font-bold'>© 2025 Tona Shop</div>
                <div className='flex gap-5 justify-between'>
                    <div className='flex flex-col md:flex-row'>
                        <span className='text-gray-500 font-semibold mr-4'>Language :</span>
                        <span className='font-medium'>United States | English</span>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <span className='text-gray-500 font-semibold mr-4'>Currency :</span>
                        <span className='font-medium'>$ USD</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
