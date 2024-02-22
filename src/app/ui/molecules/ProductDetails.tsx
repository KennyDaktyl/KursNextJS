'use client'
import { useRouter } from "next/navigation";

import type { ProductItemType } from "../types";
import { ProductImage } from "../atoms/ProductImage"
import { formatMoney } from "@/utils";

type ProductItemProps = {
    product: ProductItemType;
};

export const ProductDetails = ({ product }: ProductItemProps) => {

    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
            <div>
                <ProductImage 
                    src={ product.images.url }
                    alt={ product.images.alt } 
                />
            </div>
            <div>
                <h1>{product.name}</h1>
                <p className="text-sm font-medium text-gray-900">
                    <span className="sr-only">Cena:</span>
                    {formatMoney(product.price / 100)}
                </p>
                <p className="text-sm text-gray-500">
                    <span className="sr-only">Kategoria:</span> {product.description}
                </p>
            </div>
            <button onClick={handleGoBack} className="text-left text-blue-400 hover:text-blue-600 underline">Cofnij</button>
        </div>
    )
}
