"use server"

import { executeGraphql } from "@/api/graphqlApi"
import { CartChangeItemQuantityDocument } from "@/gql/graphql"


export const changeItemQuantity = (
    cartId: string,
    itemId: string,
    quantity: number,
) => {
   
    return executeGraphql(CartChangeItemQuantityDocument, { id: cartId, productId: itemId, quantity: quantity });
}