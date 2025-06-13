// src/app/not-found.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Logo from '@/components/Shared/Logo'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white">

            {/* ✅ Logo */ }
            <Logo />

            {/* 404 Message */ }
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>

            {/* Go Back Button */ }
            <Link href="/">
                <Button className="rounded-full px-6 py-2 bg-[#E63946] text-white hover:bg-[#d12f3d] transition cursor-pointer">
                    Go to Homepage
                </Button>
            </Link>
        </div>
    )
}
