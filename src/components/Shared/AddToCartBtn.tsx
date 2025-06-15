import React from 'react'
import { Button } from '../ui/button';

export default function AddToCartBtn() {
    return (
        <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">Add To Cart</Button>
    );
}
