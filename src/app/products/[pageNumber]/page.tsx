import { notFound } from "next/navigation";

import { getProductsCount, getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import Pagination from "@/app/ui/atoms/Pagination";


const productsPerPage = 8;


export const generateStaticParams = async () => {
    
    const numberPageToStatic = [1, 2]
    const totalProducts = await getProductsCount();
    const pagesNeeded = Math.ceil(totalProducts / productsPerPage);

    if (pagesNeeded > 1) {
        return numberPageToStatic.map((pageNumber) => {
            return {"pageNumber": pageNumber.toString()};
        });
    } else {
        return [{"pageNumber": "1"}];
    }
}


export default async function ProductsPage({params}: {params: { pageNumber: string }}) {

    const pageNumber = parseInt(params.pageNumber);
    const offset = (pageNumber - 1) * productsPerPage;

	const products = await getProductsList(productsPerPage, offset);
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
                    itemsPerPage={productsPerPage}
                />
			</section>
        </>
    )
}