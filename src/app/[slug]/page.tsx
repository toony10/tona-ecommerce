import Add from '@/components/Add'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductGalary from '@/components/Shared/ProductGalary'
import React from 'react'

export default function SingliPage() {
    return (
        <div className='CustomeContainer flex flex-col lg:flex-row justify-between gap-10'>
            {/* IMG */ }
            <div className='lg:w-1/2'>
                <ProductGalary />
            </div>
            {/* TXT */ }
            <div className='w-full lg:w-1/2'>
                <h1 className='text-4xl font-medium'>Product Title</h1>
                <p className='text-gray-500 my-7'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quasi obcaecati beatae quis facilis, culpa natus fugiat officia et perferendis illo quas possimus eos fuga voluptatum eaque, voluptas recusandae ad!
                </p>
                <div className='h-[2px] bg-gray-200' />
                <div className='my-5 flex text-center gap-4'>
                    <h3 className='text-xl text-gray-500 line-through'>$59</h3>
                    <h2 className='text-2xl font-medium'>$49</h2>
                </div>
                <div className='h-[2px] bg-gray-200' />
                <CustomizeProducts />
                <Add />
                <div className='h-[2px] bg-gray-200' />
                <div className='text-sm my-2'>
                    <h1 className='font-medium mb-4'>Title</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam mollitia nostrum quisquam facere minima autem commodi ex, provident dolor, natus possimus iste, impedit ipsum amet inventore dolores doloribus. Placeat, doloribus.
                    </p>
                </div>
                <div className='text-sm my-2'>
                    <h1 className='font-medium mb-4'>Title</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam mollitia nostrum quisquam facere minima autem commodi ex, provident dolor, natus possimus iste, impedit ipsum amet inventore dolores doloribus. Placeat, doloribus.
                    </p>
                </div>
                <div className='text-sm my-2'>
                    <h1 className='font-medium mb-4'>Title</h1>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam mollitia nostrum quisquam facere minima autem commodi ex, provident dolor, natus possimus iste, impedit ipsum amet inventore dolores doloribus. Placeat, doloribus.
                    </p>
                </div>
            </div>
        </div>
    )
}
