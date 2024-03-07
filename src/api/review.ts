import { executeGraphql } from "./graphqlApi";
import { AddProductReviewDocument } from "@/gql/graphql";


export const reviewCreate = async (
    author: string,
    description: string,
    email: string,
    productId: string,
    rating: number,
    title: string) => {

    const response = await executeGraphql({
        query: AddProductReviewDocument,
        variables: { author, description, email, productId, rating, title },
        next: {
            tags: ["/"]
        }
    });
    return response
}