import { getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";
import Custom404 from '@/app/404';
import Pagination from "@/app/ui/atoms/Pagination";

export default async function ProductsPage({params}: {params: { pageNumber: string }}) {

    const pageNumber = parseInt(params.pageNumber);
    const itemCount = 20;
    const offset = (pageNumber - 1) * itemCount;
    
	const products = await getProductsList(offset, itemCount);
    const productsLength = products.length;
	let isLastPage = false;

	if (productsLength === 0) {
		return <Custom404 />
    }

	if (productsLength < itemCount) {
		isLastPage = true;
	}

	return (
		<>
			<section className="mx-auto max-w-screen-2xl p-12">
				<ProductList products={products} />
			</section>
			<Pagination currentPage={pageNumber} isLastPage={isLastPage}/>
		</>
	);
}