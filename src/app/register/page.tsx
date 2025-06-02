import { LoginForm } from "@/components/login-form"
import Image from "next/image"

export default function Login() {

    return (
        <div className="grid h-[100vh] lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10 h-full">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block h-full">
                <Image
                    src="https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Image"
                    fill
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}
