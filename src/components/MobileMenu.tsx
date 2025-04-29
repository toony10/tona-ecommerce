"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MenuProps {
    Links: { name: string; href: string }[];
}
export default function MobileMenu({ Links }: MenuProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <Image src='/assets/menu.png' width={ 28 } height={ 28 } alt="#" className="cursor-pointer md:hidden" onClick={ () => toggleMenu() } />
            <ul className="fixed z-50 bg-gray-900 text-white text-2xl font-semibold tracking-widest left-0 top-32 w-full h-[100vh] flex flex-col justify-center items-center gap-8 container" style={ { display: isOpen ? 'flex' : 'none' } }>
                <span className="text-4xl font-bold  absolute top-5 right-5" onClick={ () => toggleMenu() }>X</span>
                { isOpen && (
                    Links.map((link, index) => (
                        <li key={ index } onClick={ () => {
                            router.push(link.href);
                            toggleMenu();
                        } }>
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
