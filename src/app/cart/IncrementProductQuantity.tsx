"use client";
import { useOptimistic } from 'react';
import { changeItemQuantity } from './actions';


export const ChangeQuantity = ({
    cartId,
    itemId,
    quantity,
}: {
    cartId: string;
    itemId: string;
    quantity: number;
}) => {

    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (currentState, optimisticValue: number) => {
            return optimisticValue;
        }
    );

    const handleDecrementClick = async () => {
        if (optimisticQuantity > 0) {
            setOptimisticQuantity(optimisticQuantity - 1);
            await changeItemQuantity(cartId, itemId, optimisticQuantity - 1);
        }
    };

    const handleIncrementClick = async () => {
        setOptimisticQuantity(optimisticQuantity + 1);
        await changeItemQuantity(cartId, itemId, optimisticQuantity + 1);
    };

    return (
        <form id={itemId} className="flex">
             <button
                className="text-red-500 border bg-slate-50 h-8 w-8 ml-2"
                formAction={handleDecrementClick}
            >
                -
            </button>
            <span data-testid="quantity" className="w-8 text-center">{optimisticQuantity}</span>
            <button
                className="text-green-500 border bg-slate-50 h-8 w-8 ml-2"
                formAction={handleIncrementClick}
            >
                +
            </button>
        </form>
    );
}
