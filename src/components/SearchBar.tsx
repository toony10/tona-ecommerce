'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function SearchBar() {
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const name = form.get('name') as string

        if (name) {
            router.push(`/list?search=${name}`)
        }
    }
    return (
        <form className='flex bg-gray-100 rounded-sm' onSubmit={ (e) => handleSearch(e) }>
            <Input type='search' name='name' placeholder='Search...' className='w-40 md:w-60 border-none shadow-none outline-none text-gray-700' />
            <Button className='h-9 px-4 rounded-md flex items-center justify-center gap-1.5 cursor-pointer'>
                <Image src='/assets/search.png' alt='search' width={ 20 } height={ 20 } />
            </Button>
        </form>
    )
}
