import { executeGraphql } from "./graphqlApi";
import { AddItemToCartDocument, CartChangeItemQuantityDocument, CartRemoveItemDocument, type CartRemoveItemMutation, type CartRemoveItemMutationVariables, CreataCartByAddProductDocument, GetCartItemsDocument, type GetCartItemsQuery, type GetCartItemsQueryVariables, type CreataCartByAddProductMutation, type CreataCartByAddProductMutationVariables } from "@/gql/graphql";


export const GetOrCreateCartByAddItem = async (productId: string, quantity: number): Promise<string> => {
    const response = await executeGraphql<CreataCartByAddProductMutation, CreataCartByAddProductMutationVariables>({
        query: CreataCartByAddProductDocument,
        variables: { productId, quantity }
    });

    return response.cartFindOrCreate.id;
}


export const ChangeItemQuantity = async ( cartId: string, productId: string, quantity_updated: number) => {
    await executeGraphql({
        query: CartChangeItemQuantityDocument,
        variables: { id: cartId, productId: productId, quantity: quantity_updated },
        next: {
            tags: ["cart"]
        }
    });
}


export const AddItemToCart = async (cartId: string, productId: string, quantity: number) => {
    await executeGraphql({
        query: AddItemToCartDocument,
        variables: { id: cartId, productId: productId, quantity: quantity },
        cache: "no-cache",
        next: {
            tags: ["/"]
        }
    });
}


interface CartItem {
    quantity: number;
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
    };
}


export const GetCartItems = async (cartId: string): Promise<CartItem[]> => {
    
    const response = await executeGraphql<GetCartItemsQuery, GetCartItemsQueryVariables>({
        query: GetCartItemsDocument,
        variables: { id: cartId },
        cache: "no-store",
        next: {
            tags: ["cart"]
        }
    });

    return response.cart?.items || [];
}


export const removeItem = async (id: string, productId: string) => {
    const response = await executeGraphql<CartRemoveItemMutation, CartRemoveItemMutationVariables>({
        query: CartRemoveItemDocument,
        variables: {
            id,
            productId
        },
        cache: "no-cache",
    });
    return response;
}