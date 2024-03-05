import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { revalidatePath } from "next/cache";

import { addProductToCart } from "./actions";
import { AddProductReviewForm } from "./addRatingForm";
import { getProductById, getProductIdForStaticPage, getProductsByCategorySlug } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import { ProductImage } from "@/app/ui/atoms/ProductImage";
import { ProductDetails } from "@/app/ui/atoms/ProductDetails";
import { SetProductQuantity } from "@/app/ui/atoms/SetProductQuantity";
// import { reviewCreate } from "@/api/review";


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

    const category_products_response = await getProductsByCategorySlug(product.categories[0].slug);
    const recommended_products_filtered = category_products_response.products.filter(p => p.id !== product.id).slice(0, 4);
    const containerName = "related-products";

    async function AddToCartAction(_formData: FormData) {
        "use server";
        
        const productId = _formData.get("productId") as string;
        const quantity = parseInt(_formData.get("quantity") as string);

        await addProductToCart(productId, quantity);
        revalidatePath("/")
    }

    // async function AddProductReviewAction(_formData: FormData) {
    //     "use server";
        
    //     const author = _formData.get("author") as string;
    //     const description = _formData.get("description") as string;
    //     const email = _formData.get("email") as string;
    //     const productId = _formData.get("productId") as string;
    //     const rating = parseInt(_formData.get("review") as string);
    //     const title = _formData.get("title") as string;

    //     await reviewCreate(author, description, email, productId, rating, title);
    //     revalidatePath(`/product/${productId}`)
    // }

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
                        price={product.price} rating={rating}
                        reviews={product.reviews.length} />
                    <form action={AddToCartAction} className="flex flex-wrap text-center justify-start items-center">
                        <input type="hidden" name="productId" value={product.id}/>
                        <SetProductQuantity />
                    </form>
                    <AddProductReviewForm productId={product.id} />
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
