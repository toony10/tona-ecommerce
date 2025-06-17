'use client'
import { Size } from '@/types';

interface Props {
    sizes: Size[] | null;
    selectedSize: string | null;
    setSelectedSize: (s: string) => void;
}

export default function CustomizeSize({ sizes, selectedSize, setSelectedSize }: Props) {
    return (
        <div className='my-5 flex flex-col gap-3 justify-center items-center'>
            <h1 className="mb-2 text-center text-lg font-semibold text-gray-800">
                Available Size{ sizes && sizes.length > 1 ? 's' : '' }
            </h1>
            <div className='flex gap-3 flex-wrap items-center justify-center'>
                { sizes?.length ? sizes.map((size) => (
                    <input
                        readOnly
                        key={ size.id }
                        className={ `border-2 w-16 text-center outline-none p-4 rounded-md mb-3 flex items-center justify-between cursor-pointer transition duration-300
                        ${ selectedSize === size.name ? 'border-primary bg-primary text-white' : 'border-primary bg-gray-100' }` }
                        value={ size.name }
                        type='button'
                        onClick={ () => setSelectedSize(size.name) }
                    />
                )) : (
                    <div className='text-gray-500 text-center'>No sizes available for this product.</div>
                ) }
            </div>
        </div>
    )
}
