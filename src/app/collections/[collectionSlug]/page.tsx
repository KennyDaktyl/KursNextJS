import type { Metadata } from "next";
import { getCollectionBySlug, getCollectionProductsBySlug, getCollections } from "@/api/collections";
import { ProductList } from "@/app/ui/organism/ProductList";


export const generateStaticParams = async () => {
    
    const response = await getCollections();

    return response.data.map(collection => ({ 
        collectionSlug: collection.slug,
    }));
}


export const generateMetadata = async({
    params,
}: {
    params: { collectionSlug: string };
}): Promise<Metadata> => {
    const collection = await getCollectionBySlug(params.collectionSlug);
    return {
        title: collection.name,
        description: collection.description,
    }
};


export default async function CollectionProductsPage({
    params,
}: {
    params: { collectionSlug: string; pageNumber: string };
}) {

    const response = await getCollectionProductsBySlug(params.collectionSlug);
    const containerName = "products-list";

    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
                <h1>
                    Produkty z kolekcji { response.collection.name }
                </h1>
				<ProductList products={response.products} containerName={containerName} />
			</section>
        </>
    )
}