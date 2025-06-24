import { Button } from "../ui/button"
import { useUserStore } from "@/store/user.store"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"

function CheckoutBtn({ onClick }: { onClick?: () => void }) {
    const { user } = useUserStore();
    return (
        <div>
            { user ?
                <Link href='/checkout'>
                    <Button className='bg-primary cursor-pointer' onClick={ onClick }>
                        Check out
                    </Button>
                </Link>
                :
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <span className='text-white p-2 bg-primary cursor-pointer rounded-lg'>
                            Checkout
                        </span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Login Required
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Please log in to your account before proceeding to checkout. You must be signed in to complete your purchase.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="opacity-80 cursor-pointer">
                                Cancel
                            </AlertDialogCancel>
                            <Link href='./register'>
                                <AlertDialogCancel className="w-full cursor-pointer" onClick={ onClick }>
                                    Login
                                </AlertDialogCancel>
                            </Link>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> }
        </div>
    )
}

export default CheckoutBtn;