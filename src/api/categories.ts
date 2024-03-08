import { executeGraphql } from "./graphqlApi";
import { GetCategoriesSlugDocument } from "@/gql/graphql";



export const GetCategoriesSlug = async () => {
    const response = await executeGraphql({
        query: GetCategoriesSlugDocument,
        variables: {},
        next: {
            revalidate: 10
        }
    });

    return response.categories?.data || [];
};
