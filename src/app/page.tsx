import { ProductList } from "./ui/organism/ProductList";
import type { ProductItemType } from "./ui/types";

const products: ProductItemType[] = [
	{
		id: "1",
		category: "Klucze",
		name: "Klucz mieszkaniowy WKE-1",
		price: 1599,
		imageCover: {
			width: 320,
			height: 428,
			src: "/klucz_1.webp",
			alt: "Klucz mieszkaniowy",
		},
	},
	{
		id: "2",
		category: "Klucze",
		name: "Klucz mieszkaniowy Energetyczny",
		price: 3599,
		imageCover: {
			width: 320,
			height: 428,
			src: "/klucz_2.webp",
			alt: "Klucz energetyczny",
		},
	},
	{
		id: "3",
		category: "Klucze",
		name: "Klucz GERDA",
		price: 6599,
		imageCover: {
			width: 320,
			height: 428,
			src: "/klucz_3.webp",
			alt: "Klucz GERDA",
		},
	},
	{
		id: "4",
		category: "Klucze",
		name: "Klucz do kłódki",
		price: 3599,
		imageCover: {
			width: 320,
			height: 428,
			src: "/klucz_4.webp",
			alt: "Klucz do kłódki",
		},
	},
];

export default function Home() {
	return (
		<section className="mx-auto max-w-screen-2xl p-12">
			<ProductList products={products} />
		</section>
	);
}
