"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface MenuProps {
    Links: { name: string; href: string }[];
}
export default function MobileMenu({ Links }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <Image src='/assets/menu.png' width={ 28 } height={ 28 } alt="#" className="cursor-pointer md:hidden" onClick={ () => toggleMenu() } />
            <ul className="absolute bg-black text-white text-xl left-0 top-32 w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-8 z-10 container" style={ { display: isOpen ? 'flex' : 'none' } }>
                { isOpen && (
                    Links.map((link, index) => (
                        <li key={ index }>
                            <Link href={ link.href }>
                                { link.name }
                            </Link>
                        </li>
                    ))
                )
                }
            </ul>
        </div>
    )
}
