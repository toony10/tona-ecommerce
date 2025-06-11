import Add from '@/components/Add'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductGalary from '@/components/Shared/ProductGalary'
import React from 'react'
import { supabaseClient } from '@/utils/supabase/SB-client';
import { Product } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import WishListBtn from '../../../components/Shared/WishListBtn';
type Params = Promise<{ id: string }>


export default async function ProductPage({ params }: { params: Params }) {
    const { id } = await params
    const { data: product, error }: { data: Product | null; error: PostgrestError | null } =
        await supabaseClient
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

    if (error) {
        return <div>{ error.message }</div>
    }
    return (
        <div className='CustomeContainer flex flex-col lg:flex-row justify-between gap-10'>
            {/* IMG */ }
            <div className='lg:w-1/2'>
                <ProductGalary images={ product?.images ?? null } />
            </div>
            {/* TXT */ }
            <div className='w-full lg:w-1/2'>
                <div className='flex gap-2'>
                    <h1 className='text-4xl font-medium'>{ product?.title }</h1>
                    { product?.id && <WishListBtn id={ product.id } /> }
                </div>
                <p className='text-gray-500 my-7'>{ product?.description }
                </p>
                <div className='h-[2px] bg-gray-200' />
                { product?.discount_percentage && product.discount_percentage > 0
                    ?
                    <div className='my-5 flex text-center gap-4'>
                        <div>
                            <h3 className='text-xl text-gray-500 line-through'>${ product.price }</h3>
                            <span className='text-green-700 text-sm'>{ product.discount_percentage }%</span>
                        </div>
                        <h2 className='text-2xl font-medium'>
                            ${ product && product.discount_percentage
                                ? (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
                                : '' }
                        </h2>
                    </div>
                    :
                    <div className='my-5 flex text-center gap-4'>
                        <h2 className='text-2xl font-medium'>${ product?.price }</h2>
                    </div>
                }

                <div className='h-[2px] bg-gray-200' />
                <CustomizeProducts />
                <Add stok={ product?.stock ?? null } />
                <div className='h-[2px] bg-gray-200' />
            </div>
        </div>
    )
}