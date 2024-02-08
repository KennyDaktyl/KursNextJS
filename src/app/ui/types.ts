export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	price: number;
	imageCover: {
		width: number;
		height: number;
		src: string;
		alt: string;
	};
};
