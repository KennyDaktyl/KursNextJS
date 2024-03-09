import { formatMoney, formatRating } from "../../../utils";


export const ProductItemDescription = ({
	name, 
	category, 
	price, 
	rating
}: {
	name: string;
	category: string;
	price: number;
	rating: number;
}) => {
	return (
		<>
			<div className="mt-2">
				<h3  role="heading" className="text-lg w-full font-semibold text-gray-700">{name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria:</span> {category}
				</p>
			</div>
			<div className="mt-2 flex justify-between">
				<p className="text-sm text-gray-500 my-1">
					<span>Rating:&nbsp;</span>
					<span className="sr-only">Rating:</span> {formatRating(rating)}
				</p>
				<p className="text-lg font-medium text-gray-900">
					<span className="sr-only">Cena:</span> {formatMoney(price / 100)}
				</p>
			</div>
		</>
	);
};
