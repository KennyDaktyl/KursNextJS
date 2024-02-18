import { getProductsList } from "@/api/products";
import { ProductList } from "@/app/ui/organism/ProductList";

export default async function ProductsPage() {

	const products = await getProductsList()

	return (
		<section className="mx-auto max-w-screen-2xl p-12">
			<ProductList products={products} />
		</section>
	);
}
