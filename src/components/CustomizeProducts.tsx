'use client';

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { supabaseClient } from '@/utils/supabase/SB-client';

interface CustomizeProductsProps {
    onSizeSelect?: (size: string) => void;
    initialSelectedSize?: string;
}

export default function CustomizeProducts({ onSizeSelect, initialSelectedSize }: CustomizeProductsProps) {
    const [sizes, setSizes] = useState<{ id: string; name: string }[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(initialSelectedSize ?? null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSizes = async () => {
            const { data, error } = await supabaseClient.from('sizes').select('*');
            if (error) {
                setError(error.message);
            } else {
                setSizes(data || []);
            }
        };
        fetchSizes();
    }, []);

    const handleSelect = (sizeName: string) => {
        setSelectedSize(sizeName);
        onSizeSelect?.(sizeName); // callback للخارج لو محتاج تستخدمه
    };

    if (error) {
        return <div className="text-red-500 text-sm">Error: { error }</div>;
    }

    return (
        <div className="flex flex-col gap-6 my-7">
            <div className="flex flex-col gap-4">
                <h4 className="font-medium">Choose a size</h4>
                <ul className="flex items-center gap-3 flex-wrap">
                    { sizes.map((size) => (
                        <li key={ size.id }>
                            <Button
                                type="button"
                                onClick={ () => handleSelect(size.name) }
                                className={ `font-semibold cursor-pointer border rounded-full px-4 py-2 ${ selectedSize === size.name
                                    ? 'bg-red-600 text-white'
                                    : 'bg-white text-black border-gray-300'
                                    }` }
                            >
                                { size.name }
                            </Button>
                        </li>
                    )) }
                </ul>
                { selectedSize && (
                    <p className="text-green-600 text-sm font-medium">Selected: { selectedSize }</p>
                ) }
            </div>
        </div>
    );
}
