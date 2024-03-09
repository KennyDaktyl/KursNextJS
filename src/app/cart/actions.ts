"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

import { revalidatePath, revalidateTag } from "next/cache";
import { ChangeItemQuantity, GetCartItems } from "@/api/carts";
import { CreateNewOrder } from "@/api/orders";


export const changeItemQuantity = (
    cartId: string,
    itemId: string,
    quantity: number,
) => {
   
    revalidateTag("cart");
    revalidatePath("/cart");
    return ChangeItemQuantity(cartId, itemId, quantity);
}


export const createNewOrder = (
    cartId: string,
    userEmail: string,
) => {
    revalidateTag("cart");
    revalidatePath("/cart");
    return CreateNewOrder(cartId, userEmail);
}


export async function handlePaymentSubmitAction() {
    "use server";

    const cartId = cookies().get("cartId")?.value;
    if (!cartId) {
        return;
    } 

    const items = await GetCartItems(cartId);

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY env variable");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
        typescript: true,
    });
    
    const userEmail = "michal.pielak81@gmail.com";

    await createNewOrder(cartId, userEmail);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "blik", "p24"],
        metadata: {
            cartId: cartId,
        },
        line_items: items.map((item) => ({
            price_data: {
                currency: "pln",
                product_data: {
                    name: item.product?.name || "",
                    description: item.product?.description,
                    images: item.product?.images.map((image) => image.url),
                    },
                unit_amount: item.product.price || 0,
                },
            quantity: item.quantity,
        })),
        mode: "payment",
        success_url: `http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/cart/canceled`,
    });

    if (!session.url) {
        throw new Error ("Something went wrong");
    }

    if (session.url) {
        cookies().set("cartId", "");
        redirect(session.url);
    }
}