import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Logo from './Logo'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

export default function Navbar() {

    const Links = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Deals', href: '/deals' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ]
    return (
        <div className='h-32 px-3 md:px-7 relative flex flex-col md:flex-row justify-between py-5'>
            <div className='flex items-center justify-between lg:gap-5'>
                <Logo />
                {/* MOBILE */ }
                <MobileMenu Links={ Links } />
            </div>

            <div className='flex items-center justify-between md:gap-6'>
                {/* DESKTOP MENU */ }
                <ul className='hidden md:flex items-center justify-between h-full gap-6 transition duration-500'>
                    { Links.map((link, index) => (
                        <li key={ index } className='hover:font-semibold'>
                            <Link href={ link.href }>
                                { link.name }
                            </Link>
                        </li>
                    )) }
                </ul>
                <SearchBar />
                <NavIcons />
            </div>

        </div>
    )
}
