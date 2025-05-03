import React from 'react'
import { Button } from './ui/button'

export default function CustomizeProducts() {
    return (
        <div className='flex flex-col gap-6 my-7'>
            <div className='flex flex-col gap-4'>
                <h4 className='font-medium'>Choose a color</h4>
                <ul className='flex items-center gap-3'>
                    <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500'>
                        <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                    </li>
                    <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500'>
                    </li>
                    <li className='w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500'>
                        <div className='absolute w-10 h-[2px] bg-red-500 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col gap-4'>
                <h4 className='font-medium'>Choose a size</h4>
                <ul className='flex items-center gap-3'>
                    <li>
                        <Button className='bg-red-500 font-semibold cursor-pointer'>Small</Button>
                    </li>

                    <li>
                        <Button className='text-red-500 border-red-500 border-[1.5px] font-semibold 
                    cursor-pointer'>Medium</Button>
                    </li>

                    <li>
                        <Button className='text-white bg-red-300 font-semibold cursor-not-allowed'>Large</Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
