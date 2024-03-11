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
        revalidatePath(`/product/${json.productId}`);
        revalidatePath(`/products/`);
        revalidatePath(`/categories/`);
        return NextResponse.json({}, {status: 200})
    }
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
}