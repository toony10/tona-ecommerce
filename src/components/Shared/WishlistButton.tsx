
'use client';

import { supabaseClient } from '@/utils/supabase/SB-client';
import { removeFromWishlist, addToWishlist } from '@/utils/wish-list';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface WishListBtnProps {
    id: string;
    size: number;
}
export default function WishlistButton({ id, size }: WishListBtnProps) {
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
            setIsWishlisted(false)
            await removeFromWishlist(id)
        } else {
            setIsWishlisted(true)
            await addToWishlist(id)
        }
    }
    return (
        <Tooltip>
            <TooltipTrigger disabled={ loadingWishlistCheck }>
                <Heart className={ `cursor-pointer transition duration-300  ${ isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }` } onClick={ () => handleWish() } size={ size } />
            </TooltipTrigger>
            <TooltipContent>
                <p>{ isWishlisted ? 'remove from wishlist' : 'Add to wishlist' }</p>
            </TooltipContent>
        </Tooltip>
    )
}
