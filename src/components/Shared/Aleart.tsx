import { motion } from 'motion/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoClose } from 'react-icons/io5'

export const successMsg = '#34D399'
export const failedMsg = '#F87171'

interface AleartProp {
    text: string,
    color: string,
    appearance: boolean
    setMessage: Dispatch<SetStateAction<boolean>>
}
export default function Aleart({ text, color, appearance, setMessage }: AleartProp) {
    return (
        <>
            { appearance &&
                <motion.p
                    initial={ { opacity: 0, scale: 0 } }
                    animate={ { opacity: 1, scale: 1 } }
                    exit={ { opacity: 0, scale: 0 } }
                    transition={ { duration: 0.4 } }
                    style={ { backgroundColor: color } }
                    className="text-white text-center p-5 font-bold rounded-xl relative"
                >
                    <IoClose className="absolute top-1 right-3 cursor-pointer" size={ 25 } onClick={ () => setMessage(false) } />
                    { text }
                </motion.p>
            }
        </>
    )
}
