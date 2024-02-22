import type { Metadata } from "next";

import { ProductDetails } from "@/app/ui/molecules/ProductDetails";
import { getProductById, getProductIdForStaticPage } from "@/api/products";
import type { ProductIdForStaticPageType } from "@/app/ui/types";


export const generateStaticParams = async () => {
    const products = await getProductIdForStaticPage(8); 

    return products.map((product: ProductIdForStaticPageType) => ({
            pageNumberOrCategory: product.category.slug,
            productPath: product.slug,
            productId: product.id,

    }));
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
            images: [product.images.url],
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
        <>
            <ProductDetails product={ product }/>
        </>
    )
}