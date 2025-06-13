'use client'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import CartModel from './CartModel'
import { supabaseClient } from '@/utils/supabase/SB-client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { CircleUserRound, ShoppingCart } from 'lucide-react'

export default function NavIcons() {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const handleSignOut = async () => {
        await supabaseClient.auth.signOut();
        setUser(null);
        window.location.reload();
    };

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabaseClient.auth.getUser();
            setUser(data?.user);
        };
        fetchUser();
    }, []);

    return (
        <div className='flex items-center justify-between gap-2 md:gap-4'>
            { user ?
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <CircleUserRound />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='p-0'>
                            <DropdownMenuLabel>
                                <span>{ user.email }</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className='mx-1' />
                            <Link href={ '/wishlist' } >
                                <DropdownMenuLabel className='cursor-pointer hover:bg-gray-400'>Wish List</DropdownMenuLabel>
                            </Link>
                            <DropdownMenuLabel className='cursor-pointer hover:bg-gray-400' onClick={ () => handleSignOut() }>Logout</DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <div className='relative'>
                                <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-center text-xs'>1</div>
                                <ShoppingCart />
                            </div>
                        </DropdownMenuTrigger>
                        <CartModel />
                    </DropdownMenu>
                </>
                : <Button className='bg-primary cursor-pointer' onClick={ () => router.push('/register') }>Login</Button> }

        </div>
    )
}
