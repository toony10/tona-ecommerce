'use client'
import { Size } from '@/types';
import { useState } from 'react';

interface Props {
    sizes: Size[] | null;
}

export default function CustomizeSize({ sizes }: Props) {
    const [selected, setSelected] = useState(0);

    return (
        <div className='my-5'>
            <h1 className="mb-2 text-center text-lg font-semibold text-gray-800">
                Select Size
            </h1>
            <div className='flex gap-3 flex-wrap items-center justify-center'>
                { sizes && sizes.length > 0 ? (
                    sizes.map((size, idx) => (
                        <input
                            readOnly
                            key={ size.id }
                            className={ `border-2 w-16 text-center outline-none p-4 rounded-md mb-3 flex items-center justify-between cursor-pointer transition duration-300
                    ${ selected === idx ? 'border-primary bg-primary text-white' : 'border-primary bg-gray-100' }
                `}
                            value={ size.name }
                            type='button'
                            onClick={ () => setSelected(idx) }
                        />
                    ))
                ) : (
                    <div className='text-gray-500 text-center'>No sizes available for this product.</div>
                ) }
            </div>
        </div>
    )
}
