
import { Button } from "../ui/button"
import { useUserStore } from "@/store/user.store"
import { useRouter } from "next/navigation"
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
function CheckoutBtn() {
    const { user } = useUserStore();
    const router = useRouter();
    return (
        <div>
            { user ?
                <Link href='/checkout'>
                    <Button className='bg-primary cursor-pointer'>
                        Check out
                    </Button>
                </Link>
                :
                <AlertDialog>
                    <AlertDialogTrigger>
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
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogCancel onClick={ () => router.push('./register') }>
                                Login
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog> }
        </div>
    )
}

export default CheckoutBtn;