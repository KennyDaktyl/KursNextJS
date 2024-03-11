/// <reference types="stripe-event-types" />

import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import Stripe from "stripe";


export async function POST(request: NextRequest): Promise<Response> {

    const body = await request.text();

    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("Missing STRIPE_SECRET_KEY env variable");
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        throw new Error("Missing STRIPE_WEBHOOK_SECRET env variable");
    }
    const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET, {
        apiVersion: "2023-10-16",
        typescript: true,
    });

    const signature = headers().get("stripe-signature");

    if (!signature) {
        return new Response("No signature", {status: 401})
    }
    
    const event = stripe.webhooks.constructEvent(
        body,
        signature ,
        process.env.STRIPE_WEBHOOK_SECRET,
    );


    switch (event.type) {
        case "checkout.session.completed": {
            event.data.object;
            console.log(event.type);
        }
        case "checkout.session.expired": {
            console.log(event.type);

        }
        case "checkout.session.async_payment_failed": {
            console.log(event.type);
        }
        case "checkout.session.async_payment_succeeded": {
            console.log(event.type);
            
        }
    }
    return new Response(null, { status: 204 });
}