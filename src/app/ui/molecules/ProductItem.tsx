import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import type { ProductItemType } from "../types";

type ProductItemProps = {
    product: ProductItemType;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    return (
            <li>
                <article>
                    <ProductImage width={ product.imageCover.width } height={ product.imageCover.height } src={ product.imageCover.src } alt={ product.imageCover.alt } />
                    <ProductItemDescription product={ product } />
                </article>
            </li>
        )
}