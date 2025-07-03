"use client"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Product, Size } from "@/types"
import Image from "next/image"
import CustomizeQuantity from "./CustomizeQuantity"
import CustomizeSize from "./CustomizeSize"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCartStore } from "@/store/cart.store"
import { toast } from "sonner"

interface Props {
    product: Product | null;
    sizes: Size[] | null;
}

export function AddCartModle({ product, sizes }: Props) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const addToCart = useCartStore(state => state.addToCart);

    const handleAddToCart = () => {
        if (!product || !selectedSize) return;
        addToCart({
            product,
            quantity,
            size: selectedSize
        });
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-24 px-12 rounded-full border-[1px] font-semibold border-primary text-primary cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
                    Add To Cart
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerDescription>Customize your order! </DrawerDescription>
                        <div className="flex items-center gap-5 justify-between">
                            <Image unoptimized src={ product?.images?.[0] ?? './assets/fallback-image.png' } alt={ product?.title ?? "Product image" } width={ 50 } height={ 50 } className="rounded-md" />
                            <DrawerTitle>{ product?.title }</DrawerTitle>
                        </div>
                    </DrawerHeader>

                    <CustomizeQuantity stock={ product?.stock } quantity={ quantity } setQuantity={ setQuantity } />
                    <CustomizeSize sizes={ sizes } selectedSize={ selectedSize } setSelectedSize={ setSelectedSize } />

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                className="bg-primary cursor-pointer"
                                onClick={ () => {
                                    toast("Event has been created", {
                                        description: `Your product:${ product?.title } has been added to the cart.`,
                                        action: {
                                            label: "Undo",
                                            onClick: () => console.log("Undo"),
                                        },
                                    });
                                    handleAddToCart();
                                } }
                            >
                                <ShoppingCart /> Add
                            </Button>
                        </DrawerClose>

                        <DrawerClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer >
    )
}
