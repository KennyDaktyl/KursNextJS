import type { Metadata } from "next";
import { ProductList } from "@/app/ui/organism/ProductList";
import { getProductsByCategorySlug } from "@/api/products";
import { GetCategoriesSlug } from "@/api/categories";


export const generateStaticParams = async () => {
    
    const categories = await GetCategoriesSlug();
    return categories.map(category => ({ 
        categorySlug: category.slug,
        pageNumber: "1"
    }));
}


interface Category {
    name: string;
    description: string;
}

export const generateMetadata = async({
    params,
}: {
    params: { categorySlug: string; pageNumber: string };
}): Promise<Metadata> => {
    const category: Category = await getProductsByCategorySlug(params.categorySlug);
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
    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
                <h1>
                    { category.name }
                </h1>
				<ProductList products={category.products} />
			</section>
        </>
    )
}