'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/types'
const images = [
    {
        id: 0,
        url: 'https://images.pexels.com/photos/30890360/pexels-photo-30890360/free-photo-of-vintage-orange-car-on-paris-street-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 1,
        url: 'https://images.pexels.com/photos/28535732/pexels-photo-28535732/free-photo-of-healthy-breakfast-with-berries-and-coffee.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/29137863/pexels-photo-29137863/free-photo-of-vibrant-crepe-myrtle-blossoms-in-ludhiana-garden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/7878199/pexels-photo-7878199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }

]

type ProductGalleryProps = {
    images: Product['images'];
};

export default function ProductGalary({ images }: ProductGalleryProps) {
    const [current, setCurrent] = useState(0);

    return (
        <div className=''>
            {/* MAIN */ }
            <div className='h-[500px] relative transition-all'>
                { images && images && (
                    <Image alt='' src={ images[current] } fill sizes='100vw' className='object-cover rounded-md' />
                ) }
            </div>
            {/* ALL IMAGES */ }
            <div className='flex gap-2 justify-between'>
                { images && images.map((image) => (
                    <div key={ image } className='w-1/4 h-32 relative gap-4 mt-8 cursor-pointer' onClick={ () => setCurrent(images.indexOf(image)) }>
                        <Image alt='' src={ image } fill sizes='20vw' className={ `object-cover rounded-md transition-all duration-300 ${ images.indexOf(image) === current && 'border-[3px] border-red-400 p-2' }` } />
                    </div>
                )) }
            </div>
        </div>
    )
}
