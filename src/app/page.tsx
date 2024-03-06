import { ProductList } from "./ui/organism/ProductList";
import { ProductSortBy, SortDirection } from "@/gql/graphql";
import { getProductsList } from "@/api/products";


export default async function Home() {

	const order = SortDirection.Desc;
    const orderby = ProductSortBy.Rating;
	const productsPerPage = 4;	
	const offset = 0;
	const products = await getProductsList(orderby, order, productsPerPage, offset);
	const containerName = "products-list";
	
	return (
		<section className="mx-auto max-w-screen-2xl p-12">
			<ProductList products={products} containerName={containerName}/>
		</section>
	);
}
