'use client'

import { useEffect, useState } from "react";
import { Button } from './ui/button';
import Link from "next/link";
import Image from "next/image";

const slides = [
    {
        id: 1,
        title: "Summer Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
        id: 2,
        title: "Winter Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
        id: 3,
        title: "Spring Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    //     }, 3000);
    //     return () => clearInterval(interval);
    // })
    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden">
            <div className="w-max h-full flex transition-all ease-in-out duration-1000" style={ { transform: `translateX(-${currentSlide * 100}vw)` } }>
                { slides.map(slide => (
                    <div className={ `${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row` } key={ slide.id }>
                        {/* TEXT CONTAINER */ }
                        <div className="h-1/2 xl:h-full xl:w-1/2 text-center flex flex-col items-center justify-center gap-5 ">
                            <p className="text-xl lg:text-2xl 2xl:text-4xl">
                                { slide.description }
                            </p>
                            <h2 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                                { slide.title }
                            </h2>
                            <Link href={ slide.url }>
                                <Button className="text-black hover:bg-gray-950 hover:text-white border bg-gray-50 transition-all ease-in-out duration-300 cursor-pointer w-40 h-10 tracking-widest text-lg">
                                    Shop Now
                                </Button>
                            </Link>
                        </div>
                        {/* IMAGE CONTAINER */ }
                        <div className="xl:w-1/2 h-1/2 xl:h-full relative">
                            <Image src={ slide.img } alt="" fill sizes="100%" className="object-cover" />
                        </div>
                    </div>
                )) }
            </div>
            <div className="absolute m-auto left-1/2 bottom-2 flex gap-4">
                {
                    slides.map((slide, index) => (
                        <div key={ slide.id } className={ `w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${currentSlide === index ? 'scale-150' : ''} duration-1000` } onClick={ () => setCurrentSlide(index) }>
                            { currentSlide === index && (<div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>) }
                        </div>
                    ))

                }
            </div>
        </div>
    )
}
