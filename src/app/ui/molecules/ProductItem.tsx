import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import type { ProductOnListItemType } from "../types";
import { ActiveLink } from "../atoms/ActiveLink";

type ProductItemProps = {
    product: ProductOnListItemType;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    const href = {
        pathname: `/products/${product.category.slug}/${product.slug}/${product.id}`,
    };

    return (
        <li className="cursor-pointer">
            <ActiveLink href={href}>
                <article>
                    <ProductImage 
                        src={ product.images.url }
                        alt={ product.images.alt } 
                    />
                    <ProductItemDescription product={ product } />
                </article>
            </ActiveLink>
        </li>
    );
};