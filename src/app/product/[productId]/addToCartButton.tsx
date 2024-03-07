"use client";
import { useFormStatus } from "react-dom"


export const AddToCartButton = () => {
    const formStatus = useFormStatus();
    
    return (
        <button
            data-testid="add-to-cart-button" 
            disabled={formStatus.pending}
            className={`py-2 px-6 border rounded-sm shadow-sm bg-slate-300 
                        ${formStatus.pending ? 'cursor-not-allowed' : 'cursor-pointer'}
                        hover:shadow-md transition-shadow`}
        >
            Add to cart
        </button>
    );
};