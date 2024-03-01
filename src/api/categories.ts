import { executeGraphql } from "./graphqlApi";
import { GetCategoriesSlugDocument } from "@/gql/graphql";



export const GetCategoriesSlug = async () => {
    const categories = await executeGraphql({
        query: GetCategoriesSlugDocument,
        variables: {}
    });

    return categories.categories.data
};
