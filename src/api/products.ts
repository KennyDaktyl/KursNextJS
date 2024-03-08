import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import { 
    GetProductByIdDocument,
    GetStaticProductsPageDocument,
    GetTotalProductsCountDocument,
    type InputMaybe,
    ProductsGetByCategorySlugDocument,
    ProductsGetListDocument,
    SearchProductsDocument, 
    type ProductSortBy,
    type SortDirection 
} from "@/gql/graphql";


export const getProductsByCategorySlug = async (categorySlug: string ) => {
    const response = await executeGraphql({
        query: ProductsGetByCategorySlugDocument,
        variables: { slug: categorySlug },
        // cache: "no-cache",
        next: {
            revalidate: 10
        }
    });

    if (!response.category) {
        throw notFound();
    }

    return response.category;
};


export const getProductsList = async (
    orderBy: InputMaybe<ProductSortBy>,
    order: InputMaybe<SortDirection>,
    itemCount: number,
    offset: number
) => {
    
	try {
        const response = await executeGraphql({
            query: ProductsGetListDocument,
            variables: { 
                orderBy: orderBy,
                order: order,  
                take: itemCount,
                skip: offset 
            },
            // cache: "no-cache",
            next: {
                revalidate: 100
            }
        });
        
        return response.products?.data ?? [];
    } catch (error) {
        console.error("GraphQL Error:", (error as Error).message);
        return [];
    }
};

export const getProductById = async (productId: string) => {
	try {
        const response = await executeGraphql({
            query: GetProductByIdDocument,
            variables: { id: productId },
            cache: "no-cache",
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
    return response.products?.data || [];
}

export const getProductsCount = async () => {
    const response = await executeGraphql({
        query: GetTotalProductsCountDocument,
        variables: {},
        cache: "no-cache",
    });
    return response.products?.meta.total || 0;
}

export const getProductsBySearch = async ( search: string ) => {
    const response = await executeGraphql({
        query: SearchProductsDocument,
        variables: { search: search }
    })
    
    return response.products?.data || [];
}
