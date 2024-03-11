'use client'
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";


export const SetSortDirection = () => {
    const [order, setOrder] = useState<string>("");
    const [orderby, setOrderBy] = useState<string>("");

    const router = useRouter();
    const path = usePathname();

    const handleSetOrdering = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [orderByValue, orderValue] = event.target.value.split(", ");
        setOrder(orderValue);
        setOrderBy(orderByValue);
        updateUrl(path, orderByValue, orderValue);
    };

    const updateUrl = (path: string, order: string, orderby: string) => {
        router.push(`/products/1?orderby=${order}&order=${orderby}`);
    };

    return (
        <div className="flex items-center mb-5">
            <label htmlFor="sort-by-price" className="mr-3">
                Sort by price:
            </label>
            <select 
                id="sort-by-price"
                className="mr-3"
                defaultValue={`price, ${order}`}
                onChange={handleSetOrdering}
            >   
                <option value="default, asc">--By price--</option>
                <option data-testid="sort-by-price" value="price, asc">Price asc</option>
                <option data-testid="sort-by-price" value="price, desc">Price desc</option>
            </select>

            <label htmlFor="sort-by-rating" className="mr-3">
                Sort by rating:
            </label>
            <select 
                id="sort-by-rating"
                className="mr-3"
                defaultValue={`rating, ${order}`} 
                onChange={handleSetOrdering}
            >
                <option value="default, asc">--By rating--</option>
                <option data-testid="sort-by-rating" value="rating, asc">Rating asc</option>
                <option data-testid="sort-by-rating" value="rating, desc">Rating desc</option>
            </select>

            {order && orderby && (
                <span className="ml-4">Choice orderby:&nbsp;{orderby}, sort direction:&nbsp;{order}</span>
            )}
        </div>
    );
};
