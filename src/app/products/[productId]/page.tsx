import type { Metadata } from "next";
import { Suspense } from "react";

import { getProductById, getProductsList } from "@/api/products";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { SuggestedProductsList } from "@/app/ui/organism/SuggestedProducts";
import { formatMoney } from "@/utils";


export const generateStaticParams = async () => {
    const products = await getProductsList();
    return products.map((product) => ({
        productId: product.id
    }))
 };

export const generateMetadata = async({
    params,
}: {
    params: { productId: string };
}): Promise<Metadata> => {
    const product = await getProductById(params.productId);
    return {
        title: `Produkt ${product.name}`,
        description: product.description,
        openGraph: {
            title: `Produkt ${product.name}`,
            description: product.description,
            images: [product.imageCover.src],
        }
    }
};

export default async function ProductDetails({
    params,
}: {
        params: { productId: string };
    }) {
    
    const product = await getProductById(params.productId)
    return (
        <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <ul>
                    <h1>{product.name}</h1>
                    <p className="text-sm font-medium text-gray-900">
                        <span className="sr-only">Cena:</span>
                        {formatMoney(product.price / 100)}
                    </p>
                    <ProductImage width={ product.imageCover.width } height={ product.imageCover.height } src={ product.imageCover.src } alt={ product.imageCover.alt } />
                </ul>
            </div>
            <h2>Suggested products</h2>
            <Suspense>
                <SuggestedProductsList />
            </Suspense>
        </>
    )
}