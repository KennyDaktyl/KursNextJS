import { formatMoney } from "../../../utils";
import type { ProductOnListItemType } from "../types";

type ProductItemDescriptionProps = {
	product: ProductOnListItemType;
};

export const ProductItemDescription = ({
	product: { category, name, price },
}: ProductItemDescriptionProps) => {
	return (
		<div className="mt-2 flex justify-between">
			<div>
				<h3 className="text-sm font-semibold text-gray-700">{name}</h3>
				<p className="text-sm text-gray-500">
					<span className="sr-only">Kategoria:</span> {category.name}
				</p>
			</div>
			<p className="text-sm font-medium text-gray-900">
				<span className="sr-only">Cena:</span> {formatMoney(price / 100)}
			</p>
		</div>
	);
};
