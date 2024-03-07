import { notFound } from "next/navigation";
import type { TypedDocumentString } from "@/gql/graphql";

export const executeGraphql = async <TResult, TVariables>({
    query,
    variables,
    next,
    cache,
}: {
    query: TypedDocumentString<TResult, TVariables>;
    variables: TVariables;
    next?: NextFetchRequestConfig;
    cache?: RequestCache;
}): Promise<TResult> => {
    if (!process.env.NEXT_PUBLIC_GRAPHQL_URL) {
        throw new TypeError("GRAPHQL_URL is not defined");
    }
    
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL, {
            method: "POST",
            body: JSON.stringify({
                query,
                variables
            }),
            headers: {
                "Content-Type": "application/json",
            },
            next,
            cache,
        });

        type GraphqlResponse<T> =
            | { data?: undefined; errors: { message: string }[] }
            | { data: T; errors?: undefined };

        const graphqlResponse =
            (await res.json()) as GraphqlResponse<TResult>;

        if (graphqlResponse.errors) {
            console.log(`GraphQL Error: ${graphqlResponse.errors?.[0]?.message || "Unknown error"}`);
            throw notFound();
            // throw new TypeError(`GraphQL Error: ${graphqlResponse.errors?.[0]?.message || "Unknown error"}`);
        }

        if (!graphqlResponse.data) {
            throw new Error("GraphQL Response data is null");
        }

        return graphqlResponse.data;
    } catch (error) {
        console.error("Error occurred during GraphQL request:", error);
        return {} as TResult;
    }
};
