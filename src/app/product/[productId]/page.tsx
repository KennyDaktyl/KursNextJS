import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CheckIcon } from "lucide-react";

import { getProductById, getProductIdForStaticPage } from "@/api/products";
import type { ProductIdForStaticPageType, ProductOnListItemType } from "@/app/ui/types";
import { getCollectionProductsBySlug } from "@/api/collections";
import { ProductList } from "@/app/ui/organism/ProductList";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { formatMoney } from "@/utils";


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

    if (!product) {
        throw notFound();
    }
    let collection_data: CollectionResponse = { products: [], collection: {"name": "", "description": "", "slug": "", "id": ""} };

    if (product.collections.slug) {
        collection_data = await getCollectionProductsBySlug(product.collections.slug);
    }

    const recommended_products_filtered = collection_data.products.filter((p: ProductOnListItemType) => p.id !== product.id
    );
    const containerName = "related-products";

    async function AddToCartAction(_formData: FormData) {
        "use server";
    
        console.log(params.productId)
    }

    return (
        <article className="mx-auto grid max-w-7xl py8">
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

                    <div>
                        <CheckIcon 
                            className="h-5 w-5 flex-shrink-0 text-pink-500"
                            aria-hidden="true"
                        />
                        <p className="ml-1 text-sm font-semibold text-slate-500">
                            In stock
                        </p>
                    </div>

                    <form action={AddToCartAction}>
                        <input type="hidden" name="productId" value={product.id}/>
                        <button className="mt-4 hover:shadow-md transition-shadow py-2 px-6 border rounded-sm shadow-sm bg-slate-300">Add to cart</button>
                    </form>
                </div>
            </div>

            {recommended_products_filtered.length > 0 && (
            <Suspense>
                <h2>Polecane produkty z kolekcji {collection_data.collection.name}</h2>
                <ProductList products={recommended_products_filtered.slice(0, 4)} containerName={containerName}/>
            </Suspense>
            )}
        </article>
    );
}