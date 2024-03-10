import { formatMoney } from "@/utils";


export function CartDetailsButton({ totalPrice }: { totalPrice: number }) {
    return (
        <a
            className="w-full "
            href="/cart"
        >
            <button
                className="mt-4 w-full mx-auto rounded-lg py-2 border hover:bg-slate-800 transition-colors bg-slate-950 text-white shadow">
            Go to card&nbsp;{formatMoney(totalPrice / 100)}
            </button>
        </a>
    );
}
