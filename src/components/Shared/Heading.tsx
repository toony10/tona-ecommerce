import React from 'react'

export default function Heading({ text, container }: { text: string, container?: boolean }) {
    return (
        <div className='mb-12 text-center md:text-start flex flex-col gap-3 items-center'>
            <h1 className={ `text-3xl font-semibold text-gray-800  ${ container ? 'px-10 md:px-24' : '' }` }>
                { text }
            </h1>
            <hr className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 h-1 bg-primary rounded-full" />
        </div>
    )
}
