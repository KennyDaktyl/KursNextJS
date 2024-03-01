"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { executeGraphql } from "@/api/graphqlApi"
import { CartChangeItemQuantityDocument } from "@/gql/graphql"


export const changeItemQuantity = (
    cartId: string,
    itemId: string,
    quantity: number,
) => {
   
    revalidateTag("cart");
    revalidatePath("/cart");
    return executeGraphql({
        query: CartChangeItemQuantityDocument,
        variables: { id: cartId, productId: itemId, quantity: quantity },
        next: {
            tags: ["cart"]
        }
    });
}