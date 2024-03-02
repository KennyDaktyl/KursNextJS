"use client";
import { useFormStatus } from "react-dom"


interface AddToCartButtonProps {
    onClick: () => void;
}


export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
    const formStatus = useFormStatus();

    const handleClick = () => {
        if (!formStatus.pending) {
            onClick(); 
        }
    };

    return (
        <button
            data-testid="add-to-cart-button" 
            disabled={formStatus.pending}
            className={`py-2 px-6 border rounded-sm shadow-sm bg-slate-300 
                        ${formStatus.pending ? 'cursor-not-allowed' : 'cursor-pointer'}
                        hover:shadow-md transition-shadow`}
            onClick={handleClick}
        >
            Add to cart
        </button>
    );
};