import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
    return (
        <>
            <Link href='/'>
                <Image unoptimized src='/assets/logo.png' width={ 100 } height={ 100 } sizes='100vh' alt="logo" className='h-12 w-36' />
            </Link>
        </>
    )
}
