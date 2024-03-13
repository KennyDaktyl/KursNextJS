import Link from "next/link";

import { ProductList } from "./ui/organism/ProductList";
import { ProductSortBy, SortDirection } from "@/gql/graphql";
import { getProductsList } from "@/api/products";
import { getCollections } from '@/api/collections';


export default async function Home() {

	const order = SortDirection.Desc;
    const orderby = ProductSortBy.Rating;
	const productsPerPage = 4;	
	const offset = 0;
	const products = await getProductsList(orderby, order, productsPerPage, offset);
	const containerName = "products-list";

	const response = await getCollections();
	
	return (
		<section className="mx-auto max-w-screen-2xl">
			<h2 className="font-bold">Most ranking</h2>
			<ProductList products={products} containerName={containerName}/>
			<section className="mx-auto max-w-screen-2xl mt-6">
                <h2 className="font-bold">Collections</h2>
                <ul className='flex justify-start align-middle flex-wrap'>
                    {response.data.map(collection => (
                        <li key={collection.id} className="p-2 flex justify-start align-middle flex-wrap">
                            <Link
								className="w-full mx-auto text-gray-800 font-bold line-h-20 hover:text-gray-600 dark:text-white" 
								role="link" 
								href={`/collections/${collection.slug}`} >
                                {collection.name}
                            </Link>
                            <span className="dark:text-white">{ collection.description }</span>
                        </li>
                    ))}
                </ul>
			</section>
		</section>
	);
}
