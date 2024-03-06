'use client'
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";


export const SetSortDirection = () => {
    const [order, setOrder] = useState<string>("");
    const [orderby, setOrderBy] = useState<string>("");

    const router = useRouter();
    const path = usePathname();

    const handleSetOrdering = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [orderValue, orderByValue] = event.target.value.split(", ");
        setOrder(orderValue);
        setOrderBy(orderByValue);
        updateUrl(path, orderByValue, orderValue);
    };

    const updateUrl = (path: string, order: string, orderby: string) => {
        router.push(`/products/1?orderby=${orderby}&order=${order}`);
    };

    return (
        <div className="flex justify-start align-middle mb-5">
            <select 
                className="mr-5"
                data-testid="sort-by-price"
                defaultValue={`${orderby},${order}`}
                onChange={handleSetOrdering}
            >
                <option value="asc, price">Price asc</option>
                <option value="desc, price">Price desc</option>
            </select>
            <select 
                data-testid="sort-by-rating" 
                defaultValue={`${orderby},${order}`} 
                onChange={handleSetOrdering}
                >
                <option value="asc, rating">Rating asc</option>
                <option value="desc, rating">Rating desc</option>
            </select>
        </div>
    );
};
