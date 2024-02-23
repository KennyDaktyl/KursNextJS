'use client'
 
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductList } from '../ui/organism/ProductList';
import type { ProductOnListItemType } from '../ui/types';
import { getProductsBySearch } from '@/api/products';


export default function SearchBar() {
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    const [products, setProducts] = useState<ProductOnListItemType[]>([]); 
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search) {
                    const data = await getProductsBySearch(search);
                    setProducts(data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData().catch(error => {
            console.error('Error fetching products:', error);
        });
    }, [search]);

    return (
        <>
            <p>Search: {search}</p>
            <ProductList products={products} />
        </>
    );
}
