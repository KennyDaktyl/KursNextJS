import { ProductList } from '../../app/ui/organism/ProductList';
import { getProductsBySearch } from '@/api/products';


interface SearchParams {
    query: string;
}


interface Props {
    searchParams: SearchParams;
}


export default async function SearchProductsPage({ searchParams }: Props) {
    const { query } = searchParams;    
    const products = await getProductsBySearch(query);
    return (
        <>
            <p>Search: {query}</p>
            <ProductList products={products} />
        </>
    );
}
