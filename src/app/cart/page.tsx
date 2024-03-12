import { cookies } from "next/headers";
import type { Metadata } from "next";
import Link from "next/link";

import { ProductImage } from "../ui/atoms/ProductImage";
import { ChangeQuantity } from "./IncrementProductQuantity";
import { RemoveButton } from "./RemoveButton";
import { handlePaymentSubmitAction } from "./actions";

import { formatMoney } from "@/utils";
import { GetCartItems } from "@/api/carts";


interface CartItem {
    quantity: number;
    product: {
        id: string;
        name: string;
        description: string,
        slug: string;
        price: number;
        images: {
            url: string,
            alt: string
        }[]
    };
}


export const generateMetadata = async(): Promise<Metadata> => {
    return {
        title: "Cart",
        description: "Cart details",
    }
};



export default async function CartPage() {
    "use server"

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
        <div className="">
            <h1 className="text-3xl font-semibold mb-4">Cart</h1>
            {items.length > 0 ? (
                <>
                <div className="overflow-x-auto">
                    <table className="lg:table-fixed mx-auto w-full">
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
                                    <td><ProductImage 
                                            src={ item.product.images[0].url }
                                            alt={ item.product.images[0].alt } 
                                    />
                                    </td>
                                    <td className="border px-4 py-2 w-96 text-lg">
                                        <Link
                                            href={`/product/${item.product.id}`}
                                            className="hover:text-gray-600"
                                        >
                                            {item.product.name}
                                        </Link>
                                    </td>
                                        
                                    <td data-testid="product-price" className="border px-4 py-2 text-center">{formatMoney(item.product.price / 100)}</td>
                                    <ChangeQuantity cartId={cartId} itemId={item.product.id} quantity={item.quantity} price={item.product.price}/>
                                    <td className="px-4 py-2 text-right">
                                        <RemoveButton cartId={ cartId } productId={ item.product.id } />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
                <form action={handlePaymentSubmitAction} className="flex justify-start items-center w-full mt-4">
                    <button className="mt-4 max-w-xs w-full rounded-lg py-2 border hover:bg-slate-800 transition-colors bg-slate-950 text-white shadow">Pay&nbsp;{formatMoney(totalPrice / 100)}</button>
                </form>
                </>
            ) : (
                    <p>Cart is Empty</p>
            )}
        </div>
    );
}