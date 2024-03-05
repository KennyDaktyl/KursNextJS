import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import { GetProductByIdDocument, GetStaticProductsPageDocument, GetTotalProductsCountDocument, ProductsGetByCategorySlugDocument, ProductsGetListDocument, SearchProductsDocument } from "@/gql/graphql";


export const getProductsByCategorySlug = async (categorySlug: string ) => {
    const response = await executeGraphql({
        query: ProductsGetByCategorySlugDocument,
        variables: { slug: categorySlug }
    });

    if (!response.category) {
        throw notFound();
    }

    return response.category;
};


export const getProductsList = async (itemCount: number, offset: number) => {
    
	try {
        const response = await executeGraphql({
            query: ProductsGetListDocument,
            variables: { take: itemCount, skip: offset }
        });
        
        return response.products.data;
    } catch (error) {
        console.error("GraphQL Error:", (error as Error).message);
        return [];
    }
};

export const getProductById = async (productId: string) => {
	try {
        const response = await executeGraphql({
            query: GetProductByIdDocument,
            variables: { id: productId }
        });

        if (!response.product) {
            throw notFound();
        }

        return response.product;
    } catch (error) {
        console.error('Error while fetching product by ID:', error);
        throw error;
    }
};

export const getProductIdForStaticPage = async (
    take: number
) => {
    const response = await executeGraphql({
        query: GetStaticProductsPageDocument,
        variables: { take: take }
    });
    return response.products.data;
}

export const getProductsCount = async () => {
    const response = await executeGraphql({
        query: GetTotalProductsCountDocument,
        variables: {}
    });
    return response.products.meta.total;
}

export const getProductsBySearch = async ( search: string ) => {
    const response = await executeGraphql({
        query: SearchProductsDocument,
        variables: { search: search }
    })
    
    return response.products.data
}
