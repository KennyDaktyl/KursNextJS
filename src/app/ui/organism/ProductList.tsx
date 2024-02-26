import { ProductItem } from "../molecules/ProductItem";
import type { ProductOnListItemType } from "../types";

export const ProductList = ({ products, containerName }: { products: ProductOnListItemType[], containerName:string }) => {
	return (
		<ul
			data-testid={containerName}
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => {
				return <ProductItem key={product.id} product={product} />;
			})}
		</ul>
	);
};
