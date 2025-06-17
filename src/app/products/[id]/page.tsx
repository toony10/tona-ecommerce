import ProductGalary from '@/components/Shared/ProductGalary'
import React from 'react'
import { supabaseClient } from '@/utils/supabase/SB-client';
import { Product, Category, Size } from '@/types';
import { PostgrestError } from '@supabase/supabase-js';
import WishlistButton from '@/components/Shared/WishlistButton';
import Heading from '@/components/Shared/Heading';
import ProductsList from '@/components/Shared/ProductsList';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Logo from '@/components/Shared/Logo';
import { AddCartModle } from '@/components/AddCartModle';

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
        return <div className="flex flex-col items-center justify-center h-screen gap-5">
            <Logo />
            <p className='text-gray-800 text-2xl font-semibold'>The product you are looking for was not found.</p>
            <Link href='/products' className='text-primary font-semibold text-lg'>Go to Products</Link>
        </div>
    }

    const { data: category, error: categoryError }: { data: Category | null; error: PostgrestError | null } =
        await supabaseClient
            .from('categories')
            .select('*')
            .eq('id', product?.category_id ?? '')
            .single();

    if (categoryError) {
        return <div>{ categoryError.message }</div>
    }

    const { data: relatedProducts, error: relatedError }: { data: Product[] | null, error: PostgrestError | null } =
        await supabaseClient.from('products')
            .select('*')
            .eq('category_id', product?.category_id ?? '')
            .order('sold_count', { ascending: false })
            .neq('id', id)
            .limit(4);

    if (relatedError) {
        return <div>{ relatedError.message }</div>
    }

    const { data: sizesId, error: sizesIdError } = await supabaseClient
        .from('product_sizes')
        .select('size_id')
        .eq('product_id', id);



    if (sizesIdError) {
        return <div>{ sizesIdError.message }</div>
    }


    const { data: sizes, error: sizesError }: { data: Size[] | null; error: PostgrestError | null } = await supabaseClient
        .from('sizes')
        .select('*')
        .in('id', sizesId?.map(size => size.size_id) ?? []);


    if (sizesError) {
        return <div>{ sizesError.message }</div>
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
                    <div className='flex flex-col gap-2 justify-end-start'>
                        <h1 className='text-4xl font-medium flex items-center gap-2'>
                            { product?.title }
                            <WishlistButton id={ product?.id ?? '' } size={ 50 } />
                        </h1>
                        <Link href={ `/products?category=${ category?.name }` } className='text-gray-500 text-sm font-bold w-10'>{ category?.name }</Link>
                    </div>

                </div>
                <p className='text-gray-500 my-7'>{ product?.description }
                </p>
                <div className='h-[2px] bg-gray-200' />
                { product?.discount_percentage && product.discount_percentage > 0
                    ?
                    <div className='my-5 flex text-center gap-4'>
                        <div>
                            <h2 className='text-3xl font-medium text-gray-800'>
                                ${ product && product.discount_percentage
                                    ? (product.price * (1 - product.discount_percentage / 100)).toFixed(2)
                                    : '' }
                            </h2>
                            <h3 className='text-xl text-gray-500 line-through'>${ product.price }</h3>
                        </div>
                        <div className='flex items-center'>
                            <span className='text-green-600 text-xl font-bold'>{ product.discount_percentage }% <br /> OFF</span>
                        </div>
                    </div>
                    :
                    <div className='my-5 flex text-center gap-4'>
                        <h2 className='text-2xl font-medium'>${ product?.price }</h2>
                    </div>
                }

                <div className='h-[2px] bg-gray-200' />
                <h2 className=" font-bold text-xl text-gray-900 my-4">
                    Size{ sizes && sizes.length > 1 ? 's' : '' }
                </h2>
                <div className='flex gap-4 my-7 justify-between items-center flex-wrap'>
                    <div className='flex gap-2 flex-wrap'>
                        { sizes && sizes.length > 0 && (
                            sizes.map((size) => (
                                <span key={ size.id } className=' bg-gray-300 text-sm font-bold text-gray-800 rounded-full px-3 py-1 '>{ size.name }</span>
                            ))
                        ) }
                    </div>
                    <AddCartModle product={ product } sizes={ sizes } />
                </div>

                {/* <Add stok={ product?.stock ?? null } /> */ }
                <div className='h-[2px] bg-gray-200' />
                { relatedProducts && relatedProducts.length > 0 && (

                    <div className='mt-2 flex flex-col items-center'>
                        <Heading text='Related Products' />
                        <ProductsList products={ relatedProducts ?? [] } />
                        <Link
                            href={ `/products?category=${ category?.name }` }
                            className="text-primary border-[1px] p-3 rounded-sm border-primary text-sm font-semibold transition-colors duration-200 hover:bg-primary hover:text-white m-auto md:m-0"
                        >
                            Show more related products
                            <MoveRight className="inline ml-2" />
                        </Link>
                    </div>
                ) }
            </div>
        </div>
    )
}