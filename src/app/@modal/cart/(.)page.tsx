import { cookies } from "next/headers";

import { type CartItem } from "@/gql/graphql";

// import { Overlay } from "@/ui/atoms/Overlay";
import { GetCartItems } from "@/api/carts";
import { formatMoney } from "@/utils";


export default async function ModalCart() {
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
    let totalPrice = 0;
    items.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
    });


	return (
		<>
			{/* <Overlay /> */}
			<div className="absolute right-0 top-0 z-40 h-screen w-full max-w-sm bg-white">
				<ul>{items.map((item) => <li key={item.product.id}>{item.product?.name}</li>)}</ul>
            </div>
            <button className="mt-4 max-w-xs w-full rounded-lg py-2 border hover:bg-slate-800 transition-colors bg-slate-950 text-white shadow">Pay&nbsp;{formatMoney(totalPrice / 100)}</button>
		</>
	);
}
