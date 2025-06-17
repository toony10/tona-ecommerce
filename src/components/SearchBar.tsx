'use client'

import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/utils/supabase/SB-client'
import { Product } from '@/types'
import Link from 'next/link'

export default function SearchBar() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Fetch search suggestions
    const fetchSuggestions = async (term: string) => {
        if (!term.trim() || term.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabaseClient
                .from('products')
                .select('id, title, price, images, discount_percentage')
                .ilike('title', `%${ term }%`)
                .limit(5);

            if (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } else {
                setSuggestions(data as Product[] || []);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchSuggestions(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (searchTerm && searchTerm.trim()) {
            router.push(`/products?search=${ encodeURIComponent(searchTerm.trim()) }`)
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (product: Product) => {
        router.push(`/products/${ product.id }`);
        setShowSuggestions(false);
        setSearchTerm('');
    }

    const formatPrice = (price: number, discount?: number | null) => {
        if (discount && discount > 0) {
            const discountedPrice = price * (1 - discount / 100);
            return `$${ discountedPrice.toFixed(2) }`;
        }
        return `$${ price.toFixed(2) }`;
    }

    return (
        <div className="relative" ref={ searchRef }>
            <form className='flex bg-gray-100 rounded-sm' onSubmit={ (e) => handleSearch(e) }>
                <Input
                    type='search'
                    name='search'
                    placeholder='Search products...'
                    className='w-40 md:w-60 border-none shadow-none outline-none text-gray-700'
                    value={ searchTerm }
                    onChange={ (e) => setSearchTerm(e.target.value) }
                    onFocus={ () => searchTerm.length >= 2 && setShowSuggestions(true) }
                />
                <Button
                    type="submit"
                    className='h-9 px-4 rounded-md flex items-center justify-center gap-1.5 cursor-pointer'
                >
                    <Image src='/assets/search.png' alt='search' width={ 20 } height={ 20 } />
                </Button>
            </form>

            {/* Search Suggestions Dropdown */ }
            { showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
                    { loading ? (
                        <div className="p-4 text-center text-gray-500">
                            Searching...
                        </div>
                    ) : suggestions.length > 0 ? (
                        <div>
                            { suggestions.map((product) => (
                                <div
                                    key={ product.id }
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                    onClick={ () => handleSuggestionClick(product) }
                                >
                                    <div className="relative w-12 h-12 flex-shrink-0">
                                        <Image
                                            src={ product.images?.[0] ?? '/assets/fallback-image.png' }
                                            alt={ product.title }
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">
                                            { product.title }
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            { formatPrice(product.price, product.discount_percentage) }
                                        </p>
                                    </div>
                                </div>
                            )) }
                            <div className="p-2 border-t border-gray-100">
                                <Link
                                    href={ `/products?search=${ encodeURIComponent(searchTerm) }` }
                                    className="text-sm text-blue-600 hover:text-blue-800 block text-center"
                                    onClick={ () => setShowSuggestions(false) }
                                >
                                    View all results for "{ searchTerm }"
                                </Link>
                            </div>
                        </div>
                    ) : searchTerm.length >= 2 ? (
                        <div className="p-4 text-center text-gray-500">
                            No products found
                        </div>
                    ) : null }
                </div>
            ) }
        </div>
    )
}
