'use client'
 
import { useEffect, useState } from 'react';
import { ProductList } from '../../app/ui/organism/ProductList';
import type { ProductOnListItemType } from '../../app/ui/types';
import { getProductsBySearch } from '@/api/products';

export default function SearchProductsPage() {
    const [search, setSearch] = useState<string | null>(null);
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

        if (search) {
            fetchData().catch(error => {
                console.error('Error fetching products:', error);
            });
        }
    }, [search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setSearch(searchParams.get('query'));
    }, []);

    return (
        <>
            <p>Search: {search}</p>
            <ProductList products={products} />
        </>
    );
}
