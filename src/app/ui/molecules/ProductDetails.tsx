import type { ProductItemType } from "../types";
import { ProductImage } from "../atoms/ProductImage"
import { formatMoney } from "@/utils";

type ProductItemProps = {
    product: ProductItemType;
};

export const ProductDetails = ({ product }: ProductItemProps) => {

    return (
        <div>
            <ProductImage width={ product.imageCover.width } height={ product.imageCover.height } src={ product.imageCover.src } alt={ product.imageCover.alt } />
            <h1>{product.name}</h1>
            <p className="text-sm font-medium text-gray-900">
                <span className="sr-only">Cena:</span>
                {formatMoney(product.price / 100)}
            </p>
            <p className="text-sm text-gray-500">
                <span className="sr-only">Kategoria:</span> {product.description}
            </p>
        </div>
    )
}
