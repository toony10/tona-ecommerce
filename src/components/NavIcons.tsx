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
import CartModel from './CartModel'

export default function NavIcons() {
    const isLogin = true;
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
                            <DropdownMenuSeparator className='mx-1' />
                            <DropdownMenuLabel className='cursor-pointer hover:bg-gray-400'>Logout</DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Image src='/assets/notification.png' alt='' width={ 20 } height={ 20 } className='cursor-pointer' />

                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <div className='relative'>
                                <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs'>1</div>
                                <Image src='/assets/cart.png' alt='cart' width={ 20 } height={ 20 } className='cursor-pointer' />
                            </div>
                        </DropdownMenuTrigger>
                        <CartModel />
                    </DropdownMenu>
                </>
                : <Button className='bg-primary cursor-pointer' onClick={ () => router.push('/login') }>Login</Button> }

        </div>
    )
}
