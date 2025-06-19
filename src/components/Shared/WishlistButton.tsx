'use client';

import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useWishlistStore } from '@/store/wishlist.store';

interface WishListBtnProps {
    id: string;
    size: number;
}

export default function WishlistButton({ id, size }: WishListBtnProps) {
    const {
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistItems
    } = useWishlistStore();

    const [isWishlisted, setIsWishlisted] = useState(false);

    // Update isWishlisted state whenever the zustand store changes
    useEffect(() => {
        setIsWishlisted(isInWishlist(id));
    }, [id, isInWishlist, wishlistItems]);

    const handleWish = () => {
        if (isWishlisted) {
            removeFromWishlist(id);
            setIsWishlisted(false);
        } else {
            addToWishlist(id);
            setIsWishlisted(true);
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <Heart
                    className={ `cursor-pointer transition duration-300 ${ isWishlisted ? 'fill-red-500 text-red-500' : '' }` }
                    onClick={ handleWish }
                    size={ size }
                />
            </TooltipTrigger>
            <TooltipContent>
                <p>{ isWishlisted ? 'Remove from wishlist' : 'Add to wishlist' }</p>
            </TooltipContent>
        </Tooltip>
    )
}
