"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { AddItemToCart, ChangeItemQuantity, GetCartItems, GetOrCreateCartByAddItem } from "@/api/carts";
import { reviewCreate } from "@/api/review";


export async function AddToCartAction(_formData: FormData) {
    "use client"
    const productId = _formData.get("productId") as string;
    const quantity = parseInt(_formData.get("quantity") as string);

    await addProductToCart(productId, quantity);
    revalidatePath("/");
}


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
                await AddItemToCart(cartId, productId, quantity);
            }
        } else {
            await AddItemToCart(cartId, productId, quantity);
        }
    }
}


export async function AddProductReviewAction(_formData: FormData) {

    const productId = _formData.get("productId") as string;
    const author = _formData.get("name") as string;
    const description = _formData.get("content") as string;
    const email = _formData.get("email") as string;
    const rating = _formData.get("rating") as string;
    const title = _formData.get("headline") as string;
    
    await reviewCreate(author, description, email, productId, parseInt(rating), title);
    revalidatePath(`/product/${productId}`);
}