/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export enum OrderSortBy {
  Default = 'DEFAULT',
  Status = 'STATUS',
  Total = 'TOTAL'
}

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Created = 'CREATED',
  Fulfilled = 'FULFILLED',
  Paid = 'PAID'
}

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export enum ProductSortBy {
  Default = 'DEFAULT',
  Name = 'NAME',
  Price = 'PRICE',
  Rating = 'RATING'
}

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type AddItemToCartMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddItemToCartMutation = { cartAddItem: { id: string } };

export type CartChangeItemQuantityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CartChangeItemQuantityMutation = { cartChangeItemQuantity: { id: string } };

export type CreataCartByAddProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type CreataCartByAddProductMutation = { cartFindOrCreate: { id: string } };

export type CartGetByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CartGetByIdQuery = { cart?: { id: string } | null };

export type GetCartItemsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetCartItemsQuery = { cart?: { items: Array<{ quantity: number, product: { id: string, name: string, description: string, slug: string, price: number, images: Array<{ url: string, alt: string }> } }> } | null };

export type CartRemoveItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type CartRemoveItemMutation = { cartRemoveItem: { id: string } };

export type GetCategoriesSlugQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesSlugQuery = { categories: { data: Array<{ slug: string }> } };

export type GetCollectionBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionBySlugQuery = { collection?: { name: string, slug: string, description: string, id: string } | null };

export type GetCollectionProductsBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetCollectionProductsBySlugQuery = { collection?: { id: string, name: string, slug: string, description: string, products: Array<{ id: string, name: string, price: number, slug: string, rating?: number | null, categories: Array<{ name: string, slug: string, id: string }>, images: Array<{ url: string, alt: string }> }> } | null };

export type GetCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionsQuery = { collections: { data: Array<{ slug: string, name: string, id: string, description: string }> } };

export type OrderCreateMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
}>;


export type OrderCreateMutation = { cartComplete: { id: string, createdAt: unknown, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown } };

export type OrderGetListByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrderGetListByEmailQuery = { orders: { data: Array<{ createdAt: unknown, id: string, lines: unknown, status: OrderStatus, totalAmount: number, updatedAt: unknown }> } };

export type GetProductByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductByIdQuery = { product?: { description: string, id: string, name: string, price: number, slug: string, rating?: number | null, images: Array<{ url: string, alt: string }>, collections: Array<{ id: string, name: string, slug: string, description: string }>, categories: Array<{ id: string, slug: string, name: string, description: string }>, reviews: Array<{ rating: number }> } | null };

export type ProductsGetByCategorySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductsGetByCategorySlugQuery = { category?: { name: string, description: string, slug: string, products: Array<{ id: string, name: string, price: number, slug: string, rating?: number | null, images: Array<{ alt: string, url: string }>, categories: Array<{ name: string, slug: string, id: string }> }> } | null };

export type GetTotalProductsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTotalProductsCountQuery = { products: { meta: { total: number } } };

export type ProductsGetListQueryVariables = Exact<{
  orderBy?: InputMaybe<ProductSortBy>;
  order?: InputMaybe<SortDirection>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsGetListQuery = { products: { data: Array<{ slug: string, name: string, price: number, id: string, rating?: number | null, images: Array<{ url: string, alt: string, height: number, width: number }>, categories: Array<{ name: string, slug: string, id: string }> }> } };

export type GetStaticProductsPageQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStaticProductsPageQuery = { products: { data: Array<{ id: string, slug: string, categories: Array<{ slug: string }> }> } };

export type SearchProductsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchProductsQuery = { products: { data: Array<{ slug: string, name: string, price: number, id: string, images: Array<{ url: string, alt: string, height: number, width: number }>, categories: Array<{ name: string, slug: string, id: string }> }> } };

export type AddProductReviewMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type AddProductReviewMutation = { reviewCreate: { id: string } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AddItemToCartDocument = new TypedDocumentString(`
    mutation AddItemToCart($id: ID!, $productId: String!, $quantity: Int!) {
  cartAddItem(
    id: $id
    input: {item: {productId: $productId, quantity: $quantity}}
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const CartChangeItemQuantityDocument = new TypedDocumentString(`
    mutation CartChangeItemQuantity($id: ID!, $productId: ID!, $quantity: Int!) {
  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartChangeItemQuantityMutation, CartChangeItemQuantityMutationVariables>;
export const CreataCartByAddProductDocument = new TypedDocumentString(`
    mutation CreataCartByAddProduct($productId: String!, $quantity: Int!) {
  cartFindOrCreate(input: {items: [{productId: $productId, quantity: $quantity}]}) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreataCartByAddProductMutation, CreataCartByAddProductMutationVariables>;
export const CartGetByIdDocument = new TypedDocumentString(`
    query CartGetById($id: ID = "") {
  cart(id: $id) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartGetByIdQuery, CartGetByIdQueryVariables>;
export const GetCartItemsDocument = new TypedDocumentString(`
    query GetCartItems($id: ID = "") {
  cart(id: $id) {
    items {
      quantity
      product {
        id
        name
        description
        slug
        price
        images {
          url
          alt
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetCartItemsQuery, GetCartItemsQueryVariables>;
export const CartRemoveItemDocument = new TypedDocumentString(`
    mutation CartRemoveItem($id: ID!, $productId: ID!) {
  cartRemoveItem(id: $id, productId: $productId) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartRemoveItemMutation, CartRemoveItemMutationVariables>;
export const GetCategoriesSlugDocument = new TypedDocumentString(`
    query GetCategoriesSlug {
  categories {
    data {
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<GetCategoriesSlugQuery, GetCategoriesSlugQueryVariables>;
export const GetCollectionBySlugDocument = new TypedDocumentString(`
    query GetCollectionBySlug($slug: String = "") {
  collection(slug: $slug) {
    name
    slug
    description
    id
  }
}
    `) as unknown as TypedDocumentString<GetCollectionBySlugQuery, GetCollectionBySlugQueryVariables>;
export const GetCollectionProductsBySlugDocument = new TypedDocumentString(`
    query getCollectionProductsBySlug($slug: String = "") {
  collection(slug: $slug) {
    id
    name
    slug
    description
    products {
      id
      name
      price
      slug
      categories {
        name
        slug
        id
      }
      images {
        url
        alt
      }
      rating
    }
  }
}
    `) as unknown as TypedDocumentString<GetCollectionProductsBySlugQuery, GetCollectionProductsBySlugQueryVariables>;
export const GetCollectionsDocument = new TypedDocumentString(`
    query GetCollections {
  collections {
    data {
      slug
      name
      id
      description
    }
  }
}
    `) as unknown as TypedDocumentString<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const OrderCreateDocument = new TypedDocumentString(`
    mutation OrderCreate($cartId: ID!, $userEmail: String!) {
  cartComplete(cartId: $cartId, userEmail: $userEmail) {
    id
    createdAt
    lines
    status
    totalAmount
    updatedAt
  }
}
    `) as unknown as TypedDocumentString<OrderCreateMutation, OrderCreateMutationVariables>;
export const OrderGetListByEmailDocument = new TypedDocumentString(`
    query OrderGetListByEmail($email: String = "", $take: Int = 10, $skip: Int = 0) {
  orders(email: $email, take: $take, skip: $skip) {
    data {
      createdAt
      id
      lines
      status
      totalAmount
      updatedAt
    }
  }
}
    `) as unknown as TypedDocumentString<OrderGetListByEmailQuery, OrderGetListByEmailQueryVariables>;
export const GetProductByIdDocument = new TypedDocumentString(`
    query GetProductById($id: ID!) {
  product(id: $id) {
    description
    id
    images {
      url
      alt
    }
    name
    price
    collections {
      id
      name
      slug
      description
    }
    slug
    categories {
      id
      slug
      name
      description
    }
    collections {
      slug
      name
      id
      description
    }
    rating
    reviews {
      rating
    }
  }
}
    `) as unknown as TypedDocumentString<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const ProductsGetByCategorySlugDocument = new TypedDocumentString(`
    query ProductsGetByCategorySlug($slug: String!) {
  category(slug: $slug) {
    products {
      id
      images {
        alt
        url
      }
      name
      price
      slug
      categories {
        name
        slug
        id
      }
      rating
    }
    name
    description
    slug
  }
}
    `) as unknown as TypedDocumentString<ProductsGetByCategorySlugQuery, ProductsGetByCategorySlugQueryVariables>;
export const GetTotalProductsCountDocument = new TypedDocumentString(`
    query GetTotalProductsCount {
  products {
    meta {
      total
    }
  }
}
    `) as unknown as TypedDocumentString<GetTotalProductsCountQuery, GetTotalProductsCountQueryVariables>;
export const ProductsGetListDocument = new TypedDocumentString(`
    query ProductsGetList($orderBy: ProductSortBy = DEFAULT, $order: SortDirection = DESC, $take: Int = 8, $skip: Int = 0) {
  products(orderBy: $orderBy, order: $order, take: $take, skip: $skip) {
    data {
      slug
      name
      price
      id
      images {
        url
        alt
        height
        width
      }
      categories {
        name
        slug
        id
      }
      rating
    }
  }
}
    `) as unknown as TypedDocumentString<ProductsGetListQuery, ProductsGetListQueryVariables>;
export const GetStaticProductsPageDocument = new TypedDocumentString(`
    query getStaticProductsPage($take: Int) {
  products(take: $take) {
    data {
      categories {
        slug
      }
      id
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<GetStaticProductsPageQuery, GetStaticProductsPageQueryVariables>;
export const SearchProductsDocument = new TypedDocumentString(`
    query SearchProducts($search: String = "") {
  products(search: $search) {
    data {
      slug
      name
      price
      id
      images {
        url
        alt
        height
        width
      }
      categories {
        name
        slug
        id
      }
    }
  }
}
    `) as unknown as TypedDocumentString<SearchProductsQuery, SearchProductsQueryVariables>;
export const AddProductReviewDocument = new TypedDocumentString(`
    mutation AddProductReview($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<AddProductReviewMutation, AddProductReviewMutationVariables>;