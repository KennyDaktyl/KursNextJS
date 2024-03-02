"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { removeItem } from "@/api/carts";


export const RemoveButton = ({ cartId,  productId }: { cartId:string, productId: string }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	
	return (
		<button
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await removeItem(cartId, productId);
					router.refresh();
				})
			}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Remove
		</button>
	);
}