import type { Metadata } from "next";
import { Suspense } from "react";

import { ProductDetails } from "@/app/ui/molecules/ProductDetails";
import { getProductById, getProductIdForStaticPage } from "@/api/products";
import type { ProductIdForStaticPageType, ProductOnListItemType } from "@/app/ui/types";
import { getCollectionProductsBySlug } from "@/api/collections";
import { ProductList } from "@/app/ui/organism/ProductList";


export const generateStaticParams = async () => {
    const products = await getProductIdForStaticPage(8); 

    return products.map((product: ProductIdForStaticPageType) => ({
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
            images: [product.images.url],
        }
    }
};

interface CollectionResponse {
    products: ProductOnListItemType[];
    collection: {
        name: string,
        description: string;
        slug: string;
        id: string
    }
}

export default async function ProductDetailsPage({
    params,
}: {
    params: { productId: string };
}) {
    const product = await getProductById(params.productId);
    let collection_data: CollectionResponse = { products: [], collection: {"name": "", "description": "", "slug": "", "id": ""} };

    if (product.collections.slug) {
        collection_data = await getCollectionProductsBySlug(product.collections.slug);
    }

    const recommended_products_filtered = collection_data.products.filter((p: ProductOnListItemType) => p.id !== product.id
    );

    return (
        <>
            <ProductDetails product={ product }/>
            {recommended_products_filtered.length > 0 && (
                <Suspense>
                    <h2>Polecane produkty z kolekcji {collection_data.collection.name}</h2>
                    <div data-testid="related-products">
                        <ProductList products={recommended_products_filtered.slice(0, 4)} />
                    </div>
                </Suspense>
            )}
        </>
    );
}