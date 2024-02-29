import { CheckIcon } from "lucide-react";
import { formatMoney } from "@/utils";


interface ProductDetailsType {
    product: {
        name: string;
        price: number;
        category: {
            name: string;
        }
        description: string;
    }
}


export const ProductDetails = ({
    product:
    { name, price, category, description },
}: ProductDetailsType) => {
    return (
        <>
            <h1 role="heading">{name}</h1>
            <p className="text-sm font-medium text-gray-900">
                <span className="sr-only">Price:</span>
                {formatMoney(price / 100)}
            </p>
            <p className="text-sm text-gray-500">
                <span className="sr-only">Category:</span> {category.name}
            </p>
            <p className="text-sm text-gray-500">
                <span className="sr-only">Description:</span> {description}
            </p>

            <div>
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
