"use client";
import { useOptimistic } from "react";
import { useFormStatus } from "react-dom";


export const AddProductReviewForm = ({ productId, rating }: { productId: string, rating: number }) => {
    const formStatus = useFormStatus();

    const [optimisticRating, setOptimisticRating] = useOptimistic(
        rating,
        (currentState, optimisticValue: number) => {
            return optimisticValue;
        }
    );
    
    return (
        <form className="max-w-md my-4">
            <input type="hidden" name="productID" value={productId} />
            <div className="mb-4">
                <label className="block mb-1" htmlFor="author">Author:</label>
                <input type="text" name="author" id="author" className="w-full px-4 py-2 border rounded-md" required />
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="description">Description:</label>
                <textarea name="description" id="description" className="w-full px-4 py-2 border rounded-md" required />
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" className="w-full px-4 py-2 border rounded-md" required />
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="review">Review:</label>
                <select name="review" id="review" className="w-full px-4 py-2 border rounded-md" required>
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1" htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className="w-full px-4 py-2 border rounded-md" required />
            </div>
            <button
                type="submit"
                className={`py-2 px-6 border rounded-sm shadow-sm bg-slate-300 
                        ${formStatus.pending ? 'cursor-not-allowed' : 'cursor-pointer'}
                        hover:shadow-md transition-shadow`}>
                Submit Review
            </button>
        </form>
    );
};
