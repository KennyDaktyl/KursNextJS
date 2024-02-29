import { ImageResponse } from "next/og";

import { ProductImage } from "@/app/ui/atoms/ProductImage";
import type { ProductItemType } from "@/app/ui/types";


export const runtime = "edge";

export const alt = "Obraz OpenGraph dla produktu";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function og(product: ProductItemType) {
    return new ImageResponse(
        (
            <div
				tw="w-full text-white h-full flex flex-col items-center justify-center text-8xl">
                <ProductImage 
                    src={ product.images.url }
                    alt={ product.images.alt } 
                />
                <div>
                    <h2 tw="font-sans uppercase m-0 p-0 text-[101px] leading-4">{product.name}</h2>
                    <p tw="font-serif m-0 p-0 font-black">{product.description}</p>
                    <p tw="font-serif m-0 p-0 font-black">Category: {product.category.name}</p>
                </div>
            </div>
        ),
    );
}
