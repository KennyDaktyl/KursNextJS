import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import type { ProductOnListItemType } from "../types";
import { ActiveLink } from "../atoms/ActiveLink";

type ProductItemProps = {
    product: ProductOnListItemType;
};

export const ProductItem = ({ product }: ProductItemProps) => {
    const href = {
        pathname: `/product/${product.id}`,
    };

    return (
        <li className="cursor-pointer flex justify-center items-center">
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