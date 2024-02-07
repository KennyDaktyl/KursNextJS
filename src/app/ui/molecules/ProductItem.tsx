import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"

type ProductItemProps = {
    product: {
        category: string;
        name: string;
        price: number;
        imageCover: {
            width: number;
            height: number;
            src: string;
            alt: string;
        };
    };
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