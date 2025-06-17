import { useState } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import Logo from "./Shared/Logo"

interface Props {
    stock: number | null | undefined;
    quantity: number;
    setQuantity: (q: number) => void;
}

export default function CustomizeQuantity({ stock, quantity, setQuantity }: Props) {
    const [alert, setAlert] = useState(false);

    const increase = () => {
        if (quantity < (stock ?? 0)) {
            setQuantity(quantity + 1);
        } else {
            setAlert(true);
        }
    }

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }
    return (
        <div className="my-5">
            <h1 className="mb-2 text-center text-lg font-semibold text-gray-800">
                Select Quantity
            </h1>
            <div className="flex items-center justify-center space-x-2">

                <span
                    className="h-8 w-8 bg-gray-100 border-2 border-gray-200 p-6 text-3xl flex items-center justify-center shrink-0 rounded-full"
                    onClick={ decrease }
                >
                    -
                </span>
                <div className="flex-1 text-center">
                    <div className="text-7xl font-bold tracking-tighter">
                        { quantity }
                    </div>

                </div>
                <div>
                    {
                        quantity < (stock ?? 0) ?
                            <span
                                className="h-8 w-8 bg-gray-100 border-2 border-gray-200 p-6 text-3xl flex items-center justify-center shrink-0 rounded-full"
                                onClick={ increase }
                            >+</span>
                            :
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <span
                                        className="h-8 w-8 bg-gray-100 border-2 border-gray-200 p-6 text-3xl flex items-center justify-center shrink-0 rounded-full"
                                        onClick={ increase }
                                    >+</span>                                            </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <div className='w-full flex items-center justify-center mb-5'>
                                            <Logo />
                                        </div>
                                        <AlertDialogTitle className='text-center'>Oops! Not Enough Stock 😅</AlertDialogTitle>
                                        <AlertDialogDescription className='text-center'>
                                            Looks like you really love this item, and we totally get it! Unfortunately, we don&apos;t have that many in stock right now. Try reducing the quantity or check back soon… more might be on the way!
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className='cursor-pointer'>OK</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                    }
                </div>
            </div>
        </div>
    )
}
