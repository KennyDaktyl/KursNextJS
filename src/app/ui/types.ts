export type ProductItemType = {
	id: string;
	category: {
		slug: string;
		name: string;
	};
	collections: {
		slug: string;
		name: string;
		id: string;
		description: string,
	};
	name: string;
	slug: string;
	price: number;
	description: string,
	images: {
		url: string;
		alt: string;
	};
};

export type ProductOnListItemType = {
	id: string;
	category: {
		slug: string;
		name: string;
		id: string;
	};
	name: string;
	slug: string;
	price: number;
	images: {
		url: string;
		alt: string;
	};
};

export type ProductIdForStaticPageType = {
	id: string;
	slug: string;
	category: {
		slug: string;
	};
};
