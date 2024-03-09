import { redirect } from "next/navigation"
import Stripe from "stripe";


export default async function CartSuccessPage({
    searchParams
}: {
    searchParams: { session_id?: string }
    }) {
    console.log("Params" + searchParams.session_id)
    if (!searchParams.session_id) {
        redirect("/")
    };

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY env variable");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
        typescript: true,
    });
    
    const sesssion = await stripe.checkout.sessions.retrieve(searchParams.session_id);
    
    return <div>{ sesssion.payment_status }</div>
}