'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import Logo from './Shared/Logo';

interface Props {
    stok: number | null;
}

export default function Add({ stok }: Props) {
    const [Qty, setQty] = useState(1);
    const [aleart, setAleart] = useState(false);

    const increase = () => {
        if (Qty < (stok ?? 0)) {
            setQty((prev) => prev + 1)
        } else {
            setAleart(!aleart)
        }
    }

    const decrease = () => {
        if (Qty >= 2) {
            setQty((prev) => prev - 1)
        }
    }
    return (
        <div className='my-7'>
            <h4 className='font-medium'>Choose a Quantity</h4>
            <div className='flex flex-col md:flex-row items-center justify-between pt-5 gap-5'>
                <div className='flex gap-5 w-full justify-between md:justify-start'>
                    <div className='bg-gray-300 font-semibold w-32 rounded-full flex items-center justify-between md:py-3 px-4 text-lg'>
                        <span className='cursor-pointer' onClick={ decrease }>-</span>
                        <span>{ Qty }</span>
                        {
                            Qty < (stok ?? 0) ?
                                <span className='cursor-pointer' onClick={ increase }>+</span>
                                :
                                <AlertDialog>
                                    <AlertDialogTrigger><span className='cursor-pointer' onClick={ increase }>+</span></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <div className='w-full flex items-center justify-center mb-5'>
                                                <Logo />
                                            </div>
                                            <AlertDialogTitle className='text-center'>Oops! Not Enough Stock 😅</AlertDialogTitle>
                                            <AlertDialogDescription className='text-center'>
                                                Looks like you really love this item, and we totally get it! Unfortunately, we don&apos;t have that many in stock right now. Try reducing the quantity or check back soon… more might be on the way!
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className='cursor-pointer'>OK</AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                        }


                    </div>
                    { stok !== null && stok <= 10 && <p className='w-1/2'>Only <span className='text-orange-400 text-center mr-0.5'>{ stok } Items</span>left <br /> Don&apos;t miss it!</p> }
                </div>
                <div className=''>
                    <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}
