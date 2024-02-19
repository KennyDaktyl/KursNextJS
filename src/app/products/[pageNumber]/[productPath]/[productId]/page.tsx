import type { Metadata } from "next";

import { getProductById, getProductsList } from "@/api/products";
import { ProductDetails } from "@/app/ui/molecules/ProductDetails";


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

export default async function ProductDetailsPage({
    params,
}: {
        params: { productId: string };
    }) {
    
    const product = await getProductById(params.productId)
    
    return (
        <div>
            <ProductDetails product={ product }/>
        </div>
    )
}