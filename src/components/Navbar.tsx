import Link from 'next/link'
import React from 'react'
import MobileMenu from './MobileMenu'
import Logo from './Shared/Logo'
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
        <div className='h-32 pb-4 md:pb-0 px-10 md:px-24 relative flex flex-col md:flex-row justify-between mb-3 md:mb-0 '>
            <div className='flex items-center justify-between lg:gap-5'>
                <Logo />
                {/* MOBILE */ }
                <MobileMenu Links={ Links } />
            </div>

            <div className='flex items-center justify-between md:gap-6'>
                {/* DESKTOP MENU */ }
                <ul className='hidden md:flex items-center justify-between h-full gap-6 transition duration-500'>
                    { Links.map((link, index) => (
                        <li key={ index } className='group text-gray-900'>
                            <Link href={ link.href }>
                                { link.name }
                            </Link>
                            <div className='bg-primary h-[2px] w-0 group-hover:w-full transition-all duration-300' />
                        </li>
                    )) }
                </ul>
                <SearchBar />
                <NavIcons />
            </div>

        </div>
    )
}
