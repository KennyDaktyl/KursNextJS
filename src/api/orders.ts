import { executeGraphql } from "./graphqlApi";
import { OrderCreateDocument, OrderGetListByEmailDocument } from "@/gql/graphql";


export const CreateNewOrder = async (cartId: string, userEmail: string) => {
    await executeGraphql({
        query: OrderCreateDocument,
        variables: { cartId: cartId, userEmail: userEmail },
        cache: "no-cache",
    });
}

export const OrderGetListByEmail = async(email: string, take: number, skip: number) => {
    const response = await executeGraphql({
        query: OrderGetListByEmailDocument,
        variables: { email: email, take: take, skip: skip},
        cache: "no-cache"
    })

    return response;
}