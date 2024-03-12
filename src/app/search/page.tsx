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

    if (!query) {
        return (
            <section className="flex justify-start align-middle mx-auto max-w-screen-2xl p-12">
                <p>Search:</p>
                <span className='text-rose-600'>Min. length is 2 letter</span>
            </section>
        );
    }

    if (query.length < 2) {
        return (
            <section className="flex justify-start align-middle mx-auto max-w-screen-2xl p-12">
                <p>Search:</p>
                <span className='text-rose-600'>Min. length is 2 letter</span>
            </section>
        );
    } 

    const products = await getProductsBySearch(query);
    const containerName = "products-list";

    return (
        <section className="mx-auto max-w-screen-2xl">
            <p>Search: {query}</p>
            <ProductList products={products} containerName={containerName}/>
        </section>
    );
}
