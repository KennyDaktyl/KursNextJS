import { notFound } from "next/navigation";

import { SetSortDirection } from "@/app/ui/atoms/SelectSortProducts";
import { getProductsCount, getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import Pagination from "@/app/ui/atoms/Pagination";
import { ProductSortBy, SortDirection } from "@/gql/graphql";
import { resolve } from "path";


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


export default async function ProductsPage({
    params,
    searchParams
}: {
    params: { pageNumber: string }, 
    searchParams: {
        order: string;
        orderby: string;
    }
}) {

    const { order, orderby } = searchParams;  

    let orderEnum: SortDirection;
    switch (order) {
        case "asc":
            orderEnum = SortDirection.Asc
            break; 
        case "desc":
            orderEnum = SortDirection.Desc
            break; 
        default:
            orderEnum = SortDirection.Desc
            break; 
    }

    let orderByEnum: ProductSortBy;
    switch (orderby) {
        case "price":
            orderByEnum = ProductSortBy.Price;
            break;
        case "rating":
            orderByEnum = ProductSortBy.Rating;
            break;
        default:
            orderByEnum = ProductSortBy.Default;
            break;
    }
    const pageNumber = parseInt(params.pageNumber);
    const offset = (pageNumber - 1) * productsPerPage;

	const products = await getProductsList(orderByEnum, orderEnum, productsPerPage, offset);
    const totalProducts = await getProductsCount();

    const href = "products"
    if (products.length === 0) {
        throw notFound();
    }
    const containerName = "products-list";

    // await new Promise((resolve) => setTimeout(resolve, 5000))
    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
                <SetSortDirection />
                <ProductList products={products} containerName={containerName} />
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