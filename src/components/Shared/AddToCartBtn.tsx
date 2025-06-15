import React from 'react';
import { Button } from '../ui/button';

type AddToCartBtnProps = {
    onClick?: () => void;
    disabled?: boolean;
    label?: string;
};

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({
    // onClick,
    // disabled = false,
    // label = 'Add to Cart',
}) => (
    <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">Add To Cart</Button>
);

export default AddToCartBtn;