import { executeGraphql } from "./graphqlApi";
import { OrderCreateDocument } from "@/gql/graphql";


export const CreateNewOrder = async (cartId: string, userEmail: string) => {
    await executeGraphql({
        query: OrderCreateDocument,
        variables: { cartId: cartId, userEmail: userEmail },
        cache: "no-cache",
    });
}
