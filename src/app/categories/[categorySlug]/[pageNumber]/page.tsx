import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductList } from "@/app/ui/organism/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { GetCategoriesSlug } from "@/api/categories";
import Pagination from "@/app/ui/atoms/Pagination";


const productsPerPage = 4;


export const generateStaticParams = async () => {
    
    const categories = await GetCategoriesSlug();
    return categories.map(category => ({ 
        categorySlug: category.slug,
        pageNumber: "1"
    }));
}


export const generateMetadata = async({
    params,
}: {
    params: { categorySlug: string; pageNumber: string };
}): Promise<Metadata> => {
    const category = await getProductsByCategorySlug(params.categorySlug);
    return {
        title: category.name,
        description: category.description,
    }
};


export default async function CategoryProductPage({
    params,
}: {
    params: { categorySlug: string; pageNumber: string };
}) {

    const category = await getProductsByCategorySlug(params.categorySlug);
    
    const pageNumber = parseInt(params.pageNumber);
    const offset = (pageNumber - 1) * productsPerPage;
    const totalProducts = category.products.length;
    const href = "categories/" + category.slug
    const products = category.products.slice(offset, offset + productsPerPage);

    if (products.length == 0) {
        throw notFound();
    }
    const containerName = "products-list";
    return (
        <>
            <section className="mx-auto max-w-screen-2xl">
                <h1>
                    { category.name }
                </h1>
                <Suspense fallback={<p>Loading data...</p>}>
    				<ProductList products={products} containerName={containerName}/>
                </Suspense>
                <Pagination
                    href={href}
                    currentPage={pageNumber}
                    totalProducts={totalProducts}
                    itemsPerPage={productsPerPage}
                />
			</section>
        </>
    )
}
