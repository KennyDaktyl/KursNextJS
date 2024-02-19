import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import type { ProductItemType } from "../types";
import { ActiveLink } from "../atoms/ActiveLink";

type ProductItemProps = {
    product: ProductItemType;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
    const productSlug = product.name.toLowerCase().replace(/\s+/g, '-');
    const href = {
        pathname: `/products/${categorySlug}/${productSlug}/${product.id}`
    };

    return (
        <li className="cursor-pointer">
            <ActiveLink href={href}>
                <article>
                    <ProductImage width={ product.imageCover.width } height={ product.imageCover.height } src={ product.imageCover.src } alt={ product.imageCover.alt } />
                    <ProductItemDescription product={ product } />
                </article>
            </ActiveLink>
        </li>
        )
}