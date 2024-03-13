"use client";
import React, { useState } from 'react';
import { AddToCartButton } from '@/app/product/[productId]/addToCartButton';
import { AddToCartAction } from '@/app/product/[productId]/actions';


export const AddProductToBasketForm = ({
    productId,
}: { 
    productId: string
}) => {

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity + 1, 1));
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };


    return (
        <form action={AddToCartAction} className="flex flex-wrap text-center justify-start items-center">
                        <input type="hidden" name="productId" value={productId}/>
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
                    className="text-center w-16 bg-white dark:bg-gray-800 text-black dark:text-white"
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
            <AddToCartButton />
        </form>
    );
};
