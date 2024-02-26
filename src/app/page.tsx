import { ProductList } from "./ui/organism/ProductList";
import { getProductsList } from "@/api/products";


export default async function Home() {

	const productsPerPage = 4;
	const offset = 0;
	const products = await getProductsList(productsPerPage, offset);

	return (
		<section className="mx-auto max-w-screen-2xl p-12">
			<ProductList products={products} />
		</section>
	);
}
