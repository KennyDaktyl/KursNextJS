import { notFound } from "next/navigation";

import { getProductsCount, getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import Pagination from "@/app/ui/atoms/Pagination";


export default async function ProductsPage({params}: {params: { pageNumberOrCategory: string }}) {

    const pageNumber = parseInt(params.pageNumberOrCategory);
    const itemCount = 8;
    const offset = (pageNumber - 1) * itemCount;

	const products = await getProductsList(itemCount, offset);
    const totalProducts = await getProductsCount();

    if (products.length === 0) {
        throw notFound();
    }
    
    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
				<ProductList products={products} />
                <Pagination
                    currentPage={pageNumber}
                    totalProducts={totalProducts}
                    itemsPerPage={itemCount}
                />
			</section>
        </>
    )
}