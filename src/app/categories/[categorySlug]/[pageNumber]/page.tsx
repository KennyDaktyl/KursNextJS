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


export default async function CategoryProductPage({
    params,
}: {
    params: { categorySlug: string; pageNumber: string };
}) {

    const products = await getProductsByCategorySlug(params.categorySlug);

    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
                <h1>
                    Produkty z kategoriami { params.categorySlug }, strona{" "}
                    { params.pageNumber }
                </h1>
				<ProductList products={products} />
			</section>
        </>
    )
}