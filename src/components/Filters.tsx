'use client';

import { Input } from "./ui/input"
import DropdownMenu from "./Shared/DropdownMenu"
import { useEffect, useState } from "react"
import { getFilters } from "@/actions/filters"
import { useRouter, useSearchParams } from "next/navigation"

export default function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<{ categories: string[] }>({
        categories: [],
    });

    const [priceState, setPriceState] = useState({
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || ''
    });

    useEffect(() => {
        async function loadFilters() {
            const data = await getFilters();
            setFilters(data);
        }
        loadFilters();
    }, []);

    const handlePriceChange = async (type: 'minPrice' | 'maxPrice', value: string) => {
        // Update local state
        const newPriceState = { ...priceState, [type]: value };
        setPriceState(newPriceState);

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(type, value);
        } else {
            params.delete(type);
        }

        // Only update URL if both prices are valid numbers or empty
        const minPrice = newPriceState.minPrice ? parseFloat(newPriceState.minPrice) : null;
        const maxPrice = newPriceState.maxPrice ? parseFloat(newPriceState.maxPrice) : null;

        if (
            (!minPrice || !isNaN(minPrice)) &&
            (!maxPrice || !isNaN(maxPrice)) &&
            (!minPrice || !maxPrice || minPrice <= maxPrice)
        ) {
            router.push(`?${ params.toString() }`, { scroll: false });
        }
    };

    return (
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 justify-between items-center gap-3">
                <Input
                    placeholder="min price"
                    className="w-32 rounded-full"
                    type="number"
                    min="0"
                    value={ priceState.minPrice }
                    onChange={ (e) => handlePriceChange('minPrice', e.target.value) }
                />
                <Input
                    placeholder="max price"
                    className="w-32 rounded-full"
                    type="number"
                    min="0"
                    value={ priceState.maxPrice }
                    onChange={ (e) => handlePriceChange('maxPrice', e.target.value) }
                />

                <DropdownMenu
                    title="Category"
                    subTitle="categories"
                    options={ filters.categories }
                />
            </div>

        </div>
    )
}
