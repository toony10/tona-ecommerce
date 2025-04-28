import Image from "next/image"
import { Button } from "./ui/button"
export default function FeaturedProducts() {
    return (
        <div className="px-10 md:px-24 m-10">
            <h1 className='text-3xl font-semibold text-gray-950 mb-12 text-center md:text-start'>Featured Products</h1>
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-center">

                {/* ITEM */ }
                <div className="w-60 flex flex-col">
                    <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                        <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 350 } alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms]" />
                        <Image src='https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 250 } sizes="100vh" alt="product" className=" rounded-md" />
                    </div>
                    <div className="p-0.5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-bold">Black T-shert</h1>
                            <h3 className="text-sm font-semibold">12.99$</h3>
                        </div>
                        <h1 className="font-semibold text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                        <Button className="w-24 rounded-full border-[1px] border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
                    </div>
                </div>


                {/* ITEM */ }
                <div className="w-60 flex flex-col">
                    <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                        <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 350 } alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms]" />
                        <Image src='https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 250 } sizes="100vh" alt="product" className=" rounded-md" />
                    </div>
                    <div className="p-0.5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-bold">Black T-shert</h1>
                            <h3 className="text-sm font-semibold">12.99$</h3>
                        </div>
                        <h1 className="font-semibold text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                        <Button className="w-24 rounded-full border-[1px] border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
                    </div>
                </div>


                {/* ITEM */ }
                <div className="w-60 flex flex-col">
                    <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                        <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 350 } alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms]" />
                        <Image src='https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 250 } sizes="100vh" alt="product" className=" rounded-md" />
                    </div>
                    <div className="p-0.5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-bold">Black T-shert</h1>
                            <h3 className="text-sm font-semibold">12.99$</h3>
                        </div>
                        <h1 className="font-semibold text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                        <Button className="w-24 rounded-full border-[1px] border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
                    </div>
                </div>


                {/* ITEM */ }
                <div className="w-60 flex flex-col">
                    <div className="relative overflow-hidden w-full h-72 mb-4 rounded-sm">
                        <Image src='https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 350 } alt="product" className="absolute z-10 hover:opacity-0 transition-all duration-[600ms]" />
                        <Image src='https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800' width={ 250 } height={ 250 } sizes="100vh" alt="product" className=" rounded-md" />
                    </div>
                    <div className="p-0.5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-bold">Black T-shert</h1>
                            <h3 className="text-sm font-semibold">12.99$</h3>
                        </div>
                        <h1 className="font-semibold text-gray-600 min-h-16">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
                        <Button className="w-24 rounded-full border-[1px] border-[#E63946] text-[#E63946] cursor-pointer hover:bg-[#E63946] hover:text-white transition-all duration-300">Add To Cart</Button>
                    </div>
                </div>


            </div>
        </div>
    )
}
