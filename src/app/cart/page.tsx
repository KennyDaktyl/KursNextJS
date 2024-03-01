import { cookies } from "next/headers";
import { ChangeQuantity } from "./IncrementProductQuantity";

import { executeGraphql } from "@/api/graphqlApi";
import { GetCartItemsDocument } from "@/gql/graphql";
import { formatMoney } from "@/utils";


interface CartItem {
    quantity: number;
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
    };
}


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

    const response = await executeGraphql(GetCartItemsDocument, { id: cartId });
    items = response.cart?.items || [];

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">Cart</h1>
            {items.length > 0 ? (
                <table className="table-fixed">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center">
                                    <ChangeQuantity cartId={cartId} itemId={item.product.id} quantity={item.quantity}/>
                                </td>
                                <td className="border px-4 py-2">{item.product.name}</td>
                                <td className="border px-4 py-2">{formatMoney(item.product.price / 100)}</td>
                                <td className="border px-4 py-2">{formatMoney((item.quantity * item.product.price) / 100)}</td>
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