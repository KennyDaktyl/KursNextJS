import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";

import type { ProductIdForStaticPageType, ProductItemType, ProductOnListItemType } from "@/app/ui/types";
import { GetProductByIdDocument, GetStaticProductsPageDocument, GetTotalProductsCountDocument, ProductsGetByCategorySlugDocument, ProductsGetListDocument, SearchProductsDocument } from "@/gql/graphql";


export const getProductsByCategorySlug = async (categorySlug: string ) => {
    const response = await executeGraphql(
        ProductsGetByCategorySlugDocument,
        { slug: categorySlug }
    );

    if (!response.category) {
        throw notFound();
    }

    const products = response.category.products.map(mapProductsListResponseItemToProductItemType);

    const categoryWithProducts = {
        ...response.category,
        products: products,
    };

    return categoryWithProducts;
};


export const getProductsList = async (itemCount: number, offset: number) => {
    
	try {
        const response = await executeGraphql(
            ProductsGetListDocument,
            { take: itemCount, skip: offset }
        );
        
        return response.products.data.map(mapProductsListResponseItemToProductItemType);
    } catch (error) {
        console.error("GraphQL Error:", (error as Error).message);
        return [];
    }
};

export const getProductById = async (productId: string) => {
	try {
        const productResponse = await executeGraphql(GetProductByIdDocument, { id: productId });

        if (!productResponse.product) {
            throw notFound();
        }

        const productData = productResponse.product;

        return productResponseItemToProductItemType(productData);
    } catch (error) {
        console.error('Error while fetching product by ID:', error);
        throw error;
    }
};

export const getProductIdForStaticPage = async (take: number): Promise<ProductIdForStaticPageType[]> => {
    const response = await executeGraphql(
        GetStaticProductsPageDocument,
        { take: take }
    );
    return response.products.data.map(mapProductsListIdResponseItemToProductItemType);
}

export const getProductsCount = async () => {
    const response = await executeGraphql(
        GetTotalProductsCountDocument,
        { }
    );
    return response.products.meta.total;
}

export const getProductsBySearch = async ( search: string ) => {
    const response = await executeGraphql(
        SearchProductsDocument,
        { search: search }
    )
    
    return response.products.data.map(mapProductsListResponseItemToProductItemType)
}


/*Products List */
interface ProductsListItemData {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: {
        url: string;
        alt: string;
    }[];
    categories: {
        name: string;
        slug: string;
        id: string;
    }[];
}

export const mapProductsListResponseItemToProductItemType = (productData: ProductsListItemData): ProductOnListItemType => ({
    id: productData.id,
    category: {
        slug: productData.categories[0]?.slug || '',
        name: productData.categories[0]?.name || '',
        id: productData.categories[0]?.id,
    },
    name: productData.name,
    price: productData.price,
    slug: productData.slug,
    images: {
        url: productData.images[0]?.url || '',
        alt: productData.images[0]?.alt || '',
    },
});


/*Product */
interface ProductResponseItem {
	description: string;
	id: string;
	name: string;
	price: number;
	slug: string;
	images: { url: string; alt: string; }[];
	collections: { id: string; name: string; slug: string; description: string; }[];
	categories: {
		id: string;
		slug: string;
		name: string;
		description: string;
	  }[]; 
}
  
const productResponseItemToProductItemType = (
    productData: ProductResponseItem,
): ProductItemType => {
    return {
		id: productData.id,
		category: {
		  slug: productData.categories[0].slug || "",
		  name: productData.categories[0].name || "",
		},
        collections: {
            slug: productData.collections[0]?.slug || "",
            name: productData.collections[0]?.name || "",
            id: productData.collections[0]?.id || "",
            description: productData.collections[0]?.description || "",
        },
		name: productData.name,
        description: productData.description,
		price: productData.price,
		slug: productData.slug,
		images: {
		  url: productData.images[0]?.url || "",
		  alt: productData.images[0]?.alt || "",
		},
	};
};

/* List Id for static page */
interface ProductsListIdResponseItem {
	id: string;
    slug: string;
    categories: {
        slug: string;
    }[];
};

const mapProductsListIdResponseItemToProductItemType = (productData: ProductsListIdResponseItem): ProductIdForStaticPageType => ({
    id: productData.id,
    category: {
        slug: productData.categories[0]?.slug || '',
    },
    slug: productData.slug,
});
