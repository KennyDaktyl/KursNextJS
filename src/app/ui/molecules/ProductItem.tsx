import { ProductImage } from "../atoms/ProductImage"
import { ProductItemDescription } from "../atoms/ProductItemDescription"
import { ActiveLink } from "../atoms/ActiveLink";


export const ProductItem = ({
    id,
    name,
    price,
    image,
    category,
    rating, 
}: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: {
        url: string;
        alt: string
    };
    rating: number;
}) => {
    const href = {
        pathname: `/product/${id}`,
    };

    return (
        <li className="cursor-pointer flex justify-center items-center">
            <ActiveLink href={href}>
                <article>
                    <ProductImage 
                        src={ image.url }
                        alt={ image.alt } 
                    />
                    <ProductItemDescription name={name} category={category} price={price} rating={rating} />
                </article>
            </ActiveLink>
        </li>
    );
};