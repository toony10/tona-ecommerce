import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import Logo from "./Shared/Logo"

interface MenuProps {
    Links: { name: string; href: string }[];
}
export default function MobileMenu({ Links }: MenuProps) {
    const router = useRouter();
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Image unoptimized src='/assets/menu.png' width={ 28 } height={ 28 } alt="#" className="cursor-pointer md:hidden" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center">
                            <Logo />
                        </DialogTitle>
                    </DialogHeader>
                    <ul className="flex flex-col items-center gap-10 text-xl font-bold text-gray-900 my-10">
                        {
                            Links.map((link, index) => (
                                <DialogClose key={ index } asChild>
                                    <li onClick={ () => {
                                        router.push(link.href);
                                    } }>
                                        { link.name }
                                    </li>
                                </DialogClose>
                            )
                            )
                        }
                    </ul>

                </DialogContent>
            </form>
        </Dialog>
    )
}
