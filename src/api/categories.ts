import { executeGraphql } from "./graphqlApi";
import { GetCategoriesSlugDocument } from "@/gql/graphql";



export const GetCategoriesSlug = async () => {
    const response = await executeGraphql({
        query: GetCategoriesSlugDocument,
        variables: {}
    });

    return response.categories?.data || [];
};
