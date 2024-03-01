/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation AddItemToCart($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    id\n  }\n}": types.AddItemToCartDocument,
    "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n  }\n}": types.CartChangeItemQuantityDocument,
    "mutation CreataCartByAddProduct($productId: String!, $quantity: Int!) {\n  cartFindOrCreate(input: {items: [{productId: $productId, quantity: $quantity}]}) {\n    id\n  }\n}": types.CreataCartByAddProductDocument,
    "query CartGetById($id: ID = \"\") {\n  cart(id: $id) {\n    id\n  }\n}": types.CartGetByIdDocument,
    "query GetCartItems($id: ID = \"\") {\n  cart(id: $id) {\n    items {\n      quantity\n      product {\n        id\n        name\n        slug\n        price\n      }\n    }\n  }\n}": types.GetCartItemsDocument,
    "query GetProductById($id: ID!) {\n  product(id: $id) {\n    description\n    id\n    images {\n      url\n      alt\n    }\n    name\n    price\n    collections {\n      id\n      name\n      slug\n      description\n    }\n    slug\n    categories {\n      id\n      slug\n      name\n      description\n    }\n    collections {\n      slug\n      name\n      id\n      description\n    }\n  }\n}": types.GetProductByIdDocument,
    "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      images {\n        alt\n        url\n      }\n      name\n      price\n      slug\n      categories {\n        name\n        slug\n        id\n      }\n    }\n    name\n    description\n    slug\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetList($take: Int = 8, $skip: Int = 0) {\n  products(take: $take, skip: $skip) {\n    data {\n      slug\n      name\n      price\n      id\n      images {\n        url\n        alt\n        height\n        width\n      }\n      categories {\n        name\n        slug\n        id\n      }\n    }\n  }\n}": types.ProductsGetListDocument,
    "query GetCategoriesSlug {\n  categories {\n    data {\n      slug\n    }\n  }\n}": types.GetCategoriesSlugDocument,
    "query GetCollectionBySlug($slug: String = \"\") {\n  collection(slug: $slug) {\n    name\n    slug\n    description\n    id\n  }\n}": types.GetCollectionBySlugDocument,
    "query getCollectionProductsBySlug($slug: String = \"\") {\n  collection(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products {\n      id\n      name\n      price\n      slug\n      categories {\n        name\n        slug\n        id\n      }\n      images {\n        url\n        alt\n      }\n    }\n  }\n}": types.GetCollectionProductsBySlugDocument,
    "query GetCollections {\n  collections {\n    data {\n      slug\n      name\n      id\n      description\n    }\n  }\n}": types.GetCollectionsDocument,
    "query GetTotalProductsCount {\n  products {\n    meta {\n      total\n    }\n  }\n}": types.GetTotalProductsCountDocument,
    "query getStaticProductsPage($take: Int) {\n  products(take: $take) {\n    data {\n      categories {\n        slug\n      }\n      id\n      slug\n    }\n  }\n}": types.GetStaticProductsPageDocument,
    "query SearchProducts($search: String = \"\") {\n  products(search: $search) {\n    data {\n      slug\n      name\n      price\n      id\n      images {\n        url\n        alt\n        height\n        width\n      }\n      categories {\n        name\n        slug\n        id\n      }\n    }\n  }\n}": types.SearchProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddItemToCart($id: ID!, $productId: String!, $quantity: Int!) {\n  cartAddItem(\n    id: $id\n    input: {item: {productId: $productId, quantity: $quantity}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').AddItemToCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    id\n  }\n}"): typeof import('./graphql').CartChangeItemQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreataCartByAddProduct($productId: String!, $quantity: Int!) {\n  cartFindOrCreate(input: {items: [{productId: $productId, quantity: $quantity}]}) {\n    id\n  }\n}"): typeof import('./graphql').CreataCartByAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($id: ID = \"\") {\n  cart(id: $id) {\n    id\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCartItems($id: ID = \"\") {\n  cart(id: $id) {\n    items {\n      quantity\n      product {\n        id\n        name\n        slug\n        price\n      }\n    }\n  }\n}"): typeof import('./graphql').GetCartItemsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetProductById($id: ID!) {\n  product(id: $id) {\n    description\n    id\n    images {\n      url\n      alt\n    }\n    name\n    price\n    collections {\n      id\n      name\n      slug\n      description\n    }\n    slug\n    categories {\n      id\n      slug\n      name\n      description\n    }\n    collections {\n      slug\n      name\n      id\n      description\n    }\n  }\n}"): typeof import('./graphql').GetProductByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!) {\n  category(slug: $slug) {\n    products {\n      id\n      images {\n        alt\n        url\n      }\n      name\n      price\n      slug\n      categories {\n        name\n        slug\n        id\n      }\n    }\n    name\n    description\n    slug\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($take: Int = 8, $skip: Int = 0) {\n  products(take: $take, skip: $skip) {\n    data {\n      slug\n      name\n      price\n      id\n      images {\n        url\n        alt\n        height\n        width\n      }\n      categories {\n        name\n        slug\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoriesSlug {\n  categories {\n    data {\n      slug\n    }\n  }\n}"): typeof import('./graphql').GetCategoriesSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollectionBySlug($slug: String = \"\") {\n  collection(slug: $slug) {\n    name\n    slug\n    description\n    id\n  }\n}"): typeof import('./graphql').GetCollectionBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getCollectionProductsBySlug($slug: String = \"\") {\n  collection(slug: $slug) {\n    id\n    name\n    slug\n    description\n    products {\n      id\n      name\n      price\n      slug\n      categories {\n        name\n        slug\n        id\n      }\n      images {\n        url\n        alt\n      }\n    }\n  }\n}"): typeof import('./graphql').GetCollectionProductsBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollections {\n  collections {\n    data {\n      slug\n      name\n      id\n      description\n    }\n  }\n}"): typeof import('./graphql').GetCollectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTotalProductsCount {\n  products {\n    meta {\n      total\n    }\n  }\n}"): typeof import('./graphql').GetTotalProductsCountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getStaticProductsPage($take: Int) {\n  products(take: $take) {\n    data {\n      categories {\n        slug\n      }\n      id\n      slug\n    }\n  }\n}"): typeof import('./graphql').GetStaticProductsPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchProducts($search: String = \"\") {\n  products(search: $search) {\n    data {\n      slug\n      name\n      price\n      id\n      images {\n        url\n        alt\n        height\n        width\n      }\n      categories {\n        name\n        slug\n        id\n      }\n    }\n  }\n}"): typeof import('./graphql').SearchProductsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
