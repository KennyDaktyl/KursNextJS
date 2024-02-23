import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import { mapProductsListResponseItemToProductItemType } from "./products";
import { GetCollectionProductsBySlugDocument } from "@/gql/graphql";


export const getCollectionProductsBySlug = async (collectionSlug: string ) => {
    const response = await executeGraphql(
        GetCollectionProductsBySlugDocument,
        { slug: collectionSlug }
    );

    if (!response.collection) {
        throw notFound();
    }
    return {
        "products": response.collection.products.map(mapProductsListResponseItemToProductItemType),
        "collection": {
            "name": response.collection.name,
            "slug": response.collection.slug,
            "description": response.collection.description,
            "id": response.collection.id
        }
    }
};
