"use client";
import React, { useState } from 'react';
import { AddToCartButton } from '@/app/product/[productId]/addToCartButton';


export const SetProductQuantity = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity + 1, 1));
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };

    const handleAddToCart = () => {
        setQuantity(1); 
    };

    return (
        <>
            <div className="w-full flex my-3 items-center">
                <button
                    type='button'
                    className="text-red-500 border bg-slate-50 h-8 w-8 mr-4"
                    onClick={decrementQuantity}
                >
                    -
                </button>
                <input
                    type="number"
                    name="quantity"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(parseInt(e.target.value), 1))}
                    className="text-center w-16"
                    readOnly
                />
                <button
                    type='button'
                    className="text-green-500 border bg-slate-50 h-8 w-8 ml-4"
                    onClick={incrementQuantity}
                >
                    +
                </button>
            </div>
            <AddToCartButton onClick={handleAddToCart}/>
        </>
    );
};
