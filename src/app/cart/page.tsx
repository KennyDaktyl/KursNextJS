import { cookies } from "next/headers";
import type { Metadata } from "next";

import { revalidatePath } from "next/cache";
import { ChangeQuantity } from "./IncrementProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { formatMoney } from "@/utils";
import { GetCartItems, removeItem } from "@/api/carts";


interface CartItem {
    quantity: number;
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
    };
}


export const generateMetadata = async(): Promise<Metadata> => {
    return {
        title: "Cart",
        description: "Cart details",
    }
};



export default async function CartPage() {
    const cartId = cookies().get("cartId")?.value;
    let items: CartItem[] = [];

    if (!cartId) {
        return (
            <>
                <h1 className="text-3xl font-semibold mb-4">Cart</h1>
                <p>Cart is Empty</p>
            </>
        );
    }

    items = await GetCartItems(cartId);


    async function RemoveItemAction(_formData: FormData) {
        "use server";
        
        const productId = _formData.get("productId") as string;
        const cartId = _formData.get("cartId") as string;

        await removeItem(cartId, productId);
        revalidatePath("/cart")
    }

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">Cart</h1>
            {items.length > 0 ? (
                <table className="table-fixed mx-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 w-96 text-lg">{item.product.name}</td>
                                <td data-testid="product-price" className="border px-4 py-2 text-center">{formatMoney(item.product.price / 100)}</td>
                                <ChangeQuantity cartId={cartId} itemId={item.product.id} quantity={item.quantity} price={item.product.price}/>
                                <td className="px-4 py-2">
                                    <form action={RemoveItemAction} className="flex flex-wrap text-center justify-start items-center">
                                        <input type="hidden" name="productId" value={item.product.id}/>
                                        <input type="hidden" name="cartId" value={cartId}/>
                                        <RemoveButton />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Cart is Empty</p>
            )}
        </>
    );
}