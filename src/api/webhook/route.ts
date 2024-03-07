import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest): Promise<Response> {
    const json: unknown = await request.json() ;
    if (
        typeof json === "object" &&
        json &&
        "productId" in json &&
        typeof json.productId === "string"
    ) {
        console.log(`Revalidating ${json.productId}`)
        revalidatePath(`/product/${json.productId}`);
        revalidatePath(`/products/`);
        return NextResponse.json({}, {status: 200})
    }

    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
}