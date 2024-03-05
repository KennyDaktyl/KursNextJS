import { ProductItem } from "../molecules/ProductItem";


export const ProductList = ({ 
	products, 
	containerName 
}: { 
	products: {
		id: string;
		name: string;
		slug: string;
		price: number;
		categories: 
			{
				name: string;
				slug: string;
				id: string
		}[];
		images: 
			{
				url: string;
				alt: string
			}[];
		rating?: number | null;
	}[], 
	containerName: string 
}) => {
	return (
		<ul
			data-testid={containerName}
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
		>
			{products.map((product) => {
				return <ProductItem 
					key={product.id} 
					id={product.id} 
					name={product.name} 
					category={product.categories[0].name} 
					price={product.price} 
					image={product.images[0]} 
					rating={product?.rating || 0} 
				/>;
			})}
		</ul>
	);
};
