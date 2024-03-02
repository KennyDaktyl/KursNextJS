"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { ChangeItemQuantity } from "@/api/carts";


export const changeItemQuantity = (
    cartId: string,
    itemId: string,
    quantity: number,
) => {
   
    revalidateTag("cart");
    revalidatePath("/cart");
    return ChangeItemQuantity(cartId, itemId, quantity);
}
