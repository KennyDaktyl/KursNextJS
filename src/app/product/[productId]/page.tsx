import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductReview } from "./productReview";
import { getProductById, getProductIdForStaticPage, getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { ProductDetails } from "@/app/ui/atoms/ProductDetails";
import { AddProductToBasketForm } from "@/app/ui/atoms/AddProductToBasketForm";


export const generateStaticParams = async () => {
    const products = await getProductIdForStaticPage(8); 

    return products.map(product => ({
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
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.images[0].url],
        }
    }
};


export default async function ProductDetailsPage({
    params,
}: {
    params: { productId: string };
}) {
    const product = await getProductById(params.productId);
    if (!product) {
        throw notFound();
    }
    const rating = product?.rating || 0;
    // const reviews = product?.reviews.length || 0;

    const category_products_response = await getProductsByCategorySlug(product.categories[0].slug);
    const recommended_products_filtered = category_products_response.products.filter(p => p.id !== product.id).slice(0, 4);
    const containerName = "related-products";

   
    return (
        <article className="mx-auto grid max-w-7xl py8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div>
                    <ProductImage 
                        src={ product.images[0].url }
                        alt={ product.images[0].alt } 
                    />
                </div>
                <div>
                    <ProductDetails 
                        name={product.name}
                        category={product.categories[0].name}
                        description={product.description}
                        price={product.price} 
                        />
                        <AddProductToBasketForm productId={product.id}/>
                    <ProductReview productId={product.id}  rating={rating} reviews={product.reviews} />
                </div>

            </div>

            {recommended_products_filtered.length > 0 && (
            <div className="my-3">
                <Suspense fallback={<p>Loading recommended products...</p>}>
                    <h2 className="text-2xl">Recommended products {product.categories[0].name}</h2>
                    <ProductList products={recommended_products_filtered} containerName={containerName}/>
                </Suspense>
            </div>
            )}
        </article>
    );
}
