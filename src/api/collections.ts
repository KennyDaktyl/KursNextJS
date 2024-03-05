import { notFound } from "next/navigation";
import { executeGraphql } from "./graphqlApi";
import { GetCollectionBySlugDocument, GetCollectionProductsBySlugDocument, GetCollectionsDocument } from "@/gql/graphql";


export const getCollections = async () => {
    const response = await executeGraphql({
        query: GetCollectionsDocument,
        variables: {}
    });

    if (!response.collections) {
        throw notFound();
    }
    return response.collections
};


export const getCollectionProductsBySlug = async (collectionSlug: string ) => {
    const response = await executeGraphql({
        query: GetCollectionProductsBySlugDocument,
        variables: { slug: collectionSlug }
    });

    if (!response.collection) {
        throw notFound();
    }
    return {
        "products": response.collection.products,
        "collection": {
            "name": response.collection.name,
            "slug": response.collection.slug,
            "description": response.collection.description,
            "id": response.collection.id
        }
    }
};

export const getCollectionBySlug = async (collectionSlug: string ) => {
    const response = await executeGraphql({
        query: GetCollectionBySlugDocument,
        variables: { slug: collectionSlug }
    });

    if (!response.collection) {
        throw notFound();
    }

    return response.collection;
}