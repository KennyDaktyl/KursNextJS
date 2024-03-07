"use client";

import { useFormStatus } from "react-dom";
import { useOptimistic } from "react";

import { AddProductReviewAction } from "./actions";
import { formatRating } from "@/utils";


export const ProductReview = ({ 
    productId, 
    rating,
    reviews
}: { 
    productId: string,
    rating: number,
    reviews: {
        rating: number
    }[]
}) => {
    const formStatus = useFormStatus();
    
    const [optimisticReviews, setOptimisticReviews] = useOptimistic(
		reviews,
		(_state, newReviews: {
            rating: number
        }[]) => {
            return newReviews
        },
	);

    const [optimisticRating, setOptimisticRating] = useOptimistic(
        rating,
        (_state, newRating: number) => {
            console.log(newRating)
            return newRating
        }
      );

    function calculateNewRating(existingRatings: {"rating": number}[]) {
        const allRatings = existingRatings.map(review => review.rating);
        const sum = allRatings.reduce((total, rating) => total + rating, 0);
        const average = sum / allRatings.length;
        return average;
    }

    function updateReviews(reviews: {"rating": number}[], newRating: number) {
        reviews.push({"rating": newRating});

        return reviews
    }

    const handleIncrementClick = async (_formData: FormData) => {
        console.log(_formData)
        try {
            const rating = _formData.get("rating");
            console.log(rating)
            if (typeof rating === 'string') {
                const parsedRating = parseInt(rating);
                if (!isNaN(parsedRating)) {
                    const updatedReviews = updateReviews(reviews, parsedRating);
                    setOptimisticReviews(updatedReviews);
        
                    const newAverageRating = calculateNewRating(reviews);
                    setOptimisticRating(newAverageRating);
        
                    await AddProductReviewAction(_formData);
                } else {
                    console.error("Parsed rating is NaN");
                }
            } else {
                console.error("Rating is not a string");
            }
        } catch (error) {
            console.error("Error while handling rating:", error);
        }
    }
    

    return (
        <>
             <p className="text-sm text-gray-500 my-3">
                <span>Rating:&nbsp;</span>
                <span className="sr-only">Rating:</span>
                {formatRating(optimisticRating)}
                <small>&nbsp;({optimisticReviews.length})</small>
            </p>
           
            <form data-testid="add-review-form" id="add-review-form" className="max-w-md my-4">
                <input type="hidden" name="productId" value={productId} />
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="headline">Title:</label>
                    <input type="text" name="headline" id="headline" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="content">Content:</label>
                    <textarea name="content" id="content" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="review">Rating:</label>
                    <select name="rating" id="rating" className="w-full px-4 py-2 border rounded-md" required >
                        <option value="">Select Rating</option>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" className="w-full px-4 py-2 border rounded-md" required />
                </div>
                
                
                <button
                    disabled={formStatus.pending}
                    formAction={handleIncrementClick}
                    className={`py-2 px-6 border rounded-sm shadow-sm bg-slate-300 
                                ${formStatus.pending ? 'cursor-not-allowed' : 'cursor-pointer'}
                                hover:shadow-md transition-shadow`}>
                    Submit Review
                </button>
            </form>
        </>

    )
}
