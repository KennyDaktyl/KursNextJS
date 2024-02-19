import Link from "next/link";
import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import type { ProductItemType } from "../types";

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
            <Link href={href}>
                <article>
                    <ProductImage width={ product.imageCover.width } height={ product.imageCover.height } src={ product.imageCover.src } alt={ product.imageCover.alt } />
                    <ProductItemDescription product={ product } />
                </article>
            </Link>
        </li>
        )
}