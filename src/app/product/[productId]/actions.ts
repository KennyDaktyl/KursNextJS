import { cookies } from "next/headers";
import { AddItemToCart, ChangeItemQuantity, GetCartItems, GetOrCreateCartByAddItem } from "@/api/carts";


export async function addProductToCart(productId: string, quantity: number) {
    const cartId = cookies().get("cartId")?.value;

    if (!cartId) {
        try {
            const cartId = await GetOrCreateCartByAddItem(productId, quantity);
            cookies().set("cartId", cartId, {
                httpOnly: true,
                sameSite: "lax",
                // secure: true
            });
        } catch (error) {
            throw new Error("Cart error");
        }
    } else {
        const items = await GetCartItems(cartId);

        if (items) {
            const productExistsInCart = items.find(item => item.product.id === productId);
            if (productExistsInCart) {
                const quantity_updated = productExistsInCart.quantity + quantity;
                await ChangeItemQuantity(cartId, productId, quantity_updated);
            } else {
                await AddItemToCart(cartId, productId, quantity)
            }
        } else {
            await AddItemToCart(cartId, productId, quantity)
        }
    }
}
