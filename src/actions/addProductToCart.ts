import { cookies } from "next/headers";
import { executeGraphql } from "@/api/graphqlApi";
import { AddItemToCartDocument, CartChangeItemQuantityDocument, CreataCartByAddProductDocument, GetCartItemsDocument } from "@/gql/graphql";


export async function addProductToCart(productId: string, quantity: number) {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        const cart = await executeGraphql({
            query: CreataCartByAddProductDocument,
            variables: { productId, quantity }
        });
        cookies().set("cartId", cart.cartFindOrCreate.id, {
            httpOnly: true,
            sameSite: "lax",
            // secure: true
        });
    } else {
        const response = await executeGraphql({
            query: GetCartItemsDocument,
            variables: { id: cartId }
        });
        const items = response.cart?.items;

        if (items) {
            const productExistsInCart = items.find(item => item.product.id === productId);
            if (productExistsInCart) {
                const quantity_updated = productExistsInCart.quantity + quantity;
                await executeGraphql({
                    query: CartChangeItemQuantityDocument,
                    variables: { id: cartId, productId: productId, quantity: quantity_updated }
                });
            } else {
                await executeGraphql({
                    query: AddItemToCartDocument,
                    variables: { id: cartId, productId: productId, quantity: quantity }
                });
            }
        } else {
            await executeGraphql({
                query: AddItemToCartDocument,
                variables: { id: cartId, productId: productId, quantity: quantity }
            });
        }
    }
}
