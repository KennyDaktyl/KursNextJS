import { ProductItem } from "../molecules/ProductItem";

export const ProductList = ({ 
    products,

}: { 
    products: ProductItem[];
}) => {
    return (
        <ul data-testid="products-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(( product ) => {
                return <ProductItem key={ product.id } product={ product } />
            })}
            
        </ul>
    )
}