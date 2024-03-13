import { CheckIcon } from "lucide-react";
import { formatMoney } from "@/utils";


export const ProductDetails = ({
    name,
    price,
    category,
    description,   
}: {
    name: string;
    price: number;
    category: string;
    description: string;
}) => {
    return (
        <>
            <h1 role="heading" className="text-4xl dark:text-white">{name}</h1>
            <p className="text-md font-medium text-gray-900 my-3 dark:text-white">
                <span className="sr-only  ">Price:</span>
                {formatMoney(price / 100)}
            </p>
            <p className="text-sm text-gray-500 my-3">
                <span className="sr-only">Category:</span> {category}
            </p>
            <p className="text-sm text-gray-500 my-3">
                <span className="sr-only">Description:</span> {description}
            </p>
           
            <div className="flex mt-3">
                <CheckIcon 
                    className="h-5 w-5 flex-shrink-0 text-pink-500"
                    aria-hidden="true"
                />
                <p className="ml-1 text-sm font-semibold text-slate-500">
                    In stock
                </p>
            </div>
        </>
    )
}
