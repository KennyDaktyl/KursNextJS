import { cookies } from "next/headers";
import NextImage from "next/image";

import { GetCartItems } from "@/api/carts";
import { Overlay } from "@/app/ui/atoms/Overlay";
import { CartDetailsButton } from "@/app/ui/atoms/CartDetailsButton";
import { formatMoney } from "@/utils";


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


export default async function ModalCart() {
	const cartId = cookies().get("cartId")?.value;
    let items: CartItem[] = [];

    if (!cartId) {
        return (
            <Overlay> 
                <h1 className="text-3xl p-4 font-semibold mb-4">Cart</h1>
                <p className="p-4">Cart is Empty</p>
            </Overlay>
        );
    }

    items = await GetCartItems(cartId);
    let totalPrice = 0;
    items.forEach((item) => {
        totalPrice += item.product.price * item.quantity;
    });

	return (
        <Overlay> 
            <ul>
                {items.map((item) => (
                    <li
                        key={item.product.id}
                        className="flex justify-start items-start align-middle space-x-4 py-4 px-2 border-b border-gray-200"
                    >
                        <div className="w-32 h-32">
                            <NextImage 
                                src={ item.product.images[0].url }
                                alt={item.product.images[0].alt}
                                width={100}
                                height={100}
                                className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold  dark:text-gray-800">{item.product?.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-800">{item.quantity}x</p>
                            <p className="text-sm font-semibold dark:text-gray-800">{formatMoney(item.product.price / 100)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <CartDetailsButton totalPrice={totalPrice} />
        </Overlay>
	);
}
