import Link from 'next/link'
import Image from 'next/image'


export default function CategoryCard() {
    return (
        <Link href='/list?cat=test' className='shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'>
            <div className='relative bg-slate-100 w-full h-96'>
                <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' alt='category' fill sizes='20vw' className='object-cover rounded-xs' />
            </div>
            <h1 className='mt-8 font-light text-xl tracking-wide'>Tile 1</h1>
        </Link>
    )
}
