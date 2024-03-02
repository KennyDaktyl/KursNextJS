import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

import { addProductToCart } from "./actions";
import { getProductById, getProductIdForStaticPage, getProductsByCategorySlug } from "@/api/products";
import type { ProductIdForStaticPageType, ProductOnListItemType } from "@/app/ui/types";
import { ProductList } from "@/app/ui/organism/ProductList";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { ProductDetails } from "@/app/ui/atoms/ProductDetails";
import { SetProductQuantity } from "@/app/ui/atoms/SetProductQuantity";


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


interface CategoryResponse {
    products: ProductOnListItemType[];
    name: string,
    description: string;
    slug: string;
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

    const category_data: CategoryResponse = await getProductsByCategorySlug(product.category.slug);
    const recommended_products_filtered = category_data.products.filter((p: ProductOnListItemType) => p.id !== product.id).slice(0, 4);
    
    const containerName = "related-products";

    async function AddToCartAction(_formData: FormData) {
        "use server";
        
        const productId = _formData.get("productId") as string;
        const quantity = parseInt(_formData.get("quantity") as string);

        await addProductToCart(productId, quantity);
        revalidatePath("/")
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
                    <ProductDetails product={product} />
                    <form action={AddToCartAction} className="flex flex-wrap text-center justify-start items-center">
                        <input type="hidden" name="productId" value={product.id}/>
                        <SetProductQuantity />
                    </form>
                </div>
            </div>

            {recommended_products_filtered.length > 0 && (
            <div className="my-3">
                <Suspense fallback={<p>Loading recommended products...</p>}>
                    <h2 className="text-2xl">Recommended products {category_data.name}</h2>
                    <ProductList products={recommended_products_filtered} containerName={containerName}/>
                </Suspense>
            </div>
            )}
        </article>
    );
}
