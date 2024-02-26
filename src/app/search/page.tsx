import type { Metadata } from 'next';
import { ProductList } from '../../app/ui/organism/ProductList';
import { getProductsBySearch } from '@/api/products';


interface SearchParams {
    query: string;
}


interface Props {
    searchParams: SearchParams;
}


export const generateMetadata = async(): Promise<Metadata> => {
    return {
        title: "Search",
        description: "Search",
    }
};


export default async function SearchProductsPage({ searchParams }: Props) {
    const { query } = searchParams;    
    const products = await getProductsBySearch(query);
    const containerName = "products-list";

    return (
        <>
            <p>Search: {query}</p>
            <ProductList products={products} containerName={containerName}/>
        </>
    );
}
