import { notFound } from "next/navigation";

import { getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import Pagination from "@/app/ui/atoms/Pagination";


export default async function ProductsPage({params}: {params: { pageNumberOrCategory: string }}) {

    const pageNumber = parseInt(params.pageNumberOrCategory);
    const itemCount = 8;
    const offset = (pageNumber - 1) * itemCount;
	let isLastPage = false;

	const products = await getProductsList(itemCount, offset);

    if (products.length === 0) {
        throw notFound();
    }
    if (products.length < itemCount) {
        isLastPage = true;
    }
    
    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
				<ProductList products={products} />
                <Pagination currentPage={pageNumber} isLastPage={isLastPage}/>
			</section>
        </>
    )
}