import React from 'react'

export default function Heading({ text, container }: { text: string, container?: boolean }) {
    return (
        <h1 className={ `text-3xl font-semibold text-gray-950 mb-12 text-center md:text-start ${container ? 'px-10 md:px-24' : ''}` }>
            { text }
        </h1>
    )
}
