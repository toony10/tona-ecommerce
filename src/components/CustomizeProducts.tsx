import React from 'react'
import { Button } from './ui/button'

export default function CustomizeProducts() {
    return (
        <div className='flex flex-col gap-6 my-7'>
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
