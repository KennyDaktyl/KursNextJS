import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getProductById, getProductIdForStaticPage, getProductsByCategorySlug } from "@/api/products";
import type { ProductIdForStaticPageType, ProductOnListItemType } from "@/app/ui/types";
import { ProductList } from "@/app/ui/organism/ProductList";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { ProductDetails } from "@/app/ui/atoms/ProductDetails";
import { addProductToCart } from "@/actions/addProductToCart";


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
                    <form action={AddToCartAction}>
                        <input type="hidden" name="productId" value={product.id}/>
                        <input type="number" name="quantity" min={1} defaultValue={1} required/>
                        <button data-testid="add-to-cart-button" className="mt-4 hover:shadow-md transition-shadow py-2 px-6 border rounded-sm shadow-sm bg-slate-300">Add to cart</button>
                    </form>
                </div>
            </div>

            {recommended_products_filtered.length > 0 && (
            <Suspense fallback={<p>Loading recommended products...</p>}>
                <h2>Polecane produkty z kategorii {category_data.name}</h2>
                <ProductList products={recommended_products_filtered} containerName={containerName}/>
            </Suspense>
            )}
        </article>
    );
}
