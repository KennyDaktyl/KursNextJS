"use client";
import { useOptimistic } from 'react';
import { changeItemQuantity } from './actions';
import { formatMoney } from '@/utils';


export const ChangeQuantity = ({
    cartId,
    itemId,
    quantity,
    price
}: {
    cartId: string;
    itemId: string;
    quantity: number;
    price: number
}) => {

    const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
        quantity,
        (currentState, optimisticValue: number) => {
            return optimisticValue;
        }
    );

    const handleDecrementClick = async () => {
        if (optimisticQuantity > 1) {
            setOptimisticQuantity(optimisticQuantity - 1);
            await changeItemQuantity(cartId, itemId, optimisticQuantity - 1);
        }
    };

    const handleIncrementClick = async () => {
        setOptimisticQuantity(optimisticQuantity + 1);
        await changeItemQuantity(cartId, itemId, optimisticQuantity + 1);
    };

    return (
        <>
            <td className="border px-4 py-2 mx-auto">
                <form id={itemId} className="text-center flex justify-center items-center">
                    <button
                        data-testid="decrement"
                        className="text-red-500 border bg-slate-50 h-8 w-8 mr-4"
                        formAction={handleDecrementClick}
                    >
                        -
                    </button>
                    <span data-testid="quantity" className="text-center w-8">{optimisticQuantity}</span>
                    <button
                        data-testid="increment"
                        className="text-green-500 border bg-slate-50 h-8 w-8 ml-4"
                        formAction={handleIncrementClick}
                    >
                        +
                    </button>
                </form>
            </td>
            <td className="border px-4 py-2 w-32 text-center text-lg font-semibold">{formatMoney((optimisticQuantity * price) / 100)}</td>
        </>
    );
}
