
'use client';

import { supabaseClient } from '@/utils/supabase/SB-client';
import { removeFromWishlist, addToWishlist } from '@/utils/wish-list';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface WishListBtnProps {
    id: string;
}
export default function wishListBtn({ id }: WishListBtnProps) {
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false)
    const [loadingWishlistCheck, setLoadingWishlistCheck] = useState(true);

    const supabase = supabaseClient;
    useEffect(() => {
        const checkWishlist = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoadingWishlistCheck(false);
                return;
            };

            const { data } = await supabase
                .from('wishlist')
                .select('id')
                .eq('user_id', user.id)
                .eq('product_id', id)
                .single();

            if (data) {
                setIsWishlisted(true);
            }
            setLoadingWishlistCheck(false);
        };

        checkWishlist();
    }, [id]);

    const handleWish = async () => {
        if (isWishlisted) {
            await removeFromWishlist(id)
            setIsWishlisted(false)
        } else {
            await addToWishlist(id)
            setIsWishlisted(true)
        }
    }
    return (
        <button disabled={ loadingWishlistCheck }>
            <Heart className={ `cursor-pointer transition duration-300  ${ isWishlisted ? 'fill-red-500 text-red-500' : ''
                }` } onClick={ () => handleWish() } />
        </button>
    )
}
