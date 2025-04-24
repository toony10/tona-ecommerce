'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
// import { useState } from 'react'

export default function NavIcons() {
    const isLogin = false;
    const router = useRouter()


    return (
        <div className='flex items-center justify-between gap-2 md:gap-4'>
            { isLogin ?

                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <Image src='/assets/profile.png' alt='' width={ 20 } height={ 20 } className='cursor-pointer' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='p-0'>
                            <DropdownMenuLabel className='cursor-pointer hover:bg-gray-400 p-2'>
                                <Link href='/'>Profile</Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className='m-0' />
                            <DropdownMenuLabel className='cursor-pointer hover:bg-gray-400'>Logout</DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu><Image src='/assets/notification.png' alt='' width={ 20 } height={ 20 } className='cursor-pointer' /><Image src='/assets/cart.png' alt='' width={ 20 } height={ 20 } className='cursor-pointer' /></>
                : <Button className='bg-primary cursor-pointer' onClick={ () => router.push('/login') }>Login</Button> }

        </div>
    )
}
