import { ProductList } from "@/app/ui/organism/ProductList";
import { getProductsByCategorySlug } from "@/api/products";

export const generateStaticParams = async ({
    params,
}: {
    params: { category: string};
}) => {
    if (params.category === "t-shirts") {
        return [{ pageNumber: "1" }, { pageNumber: "2" }];
    } else {
        return [{ pageNumber: "1" }]
    }
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