import { getCollectionProductsBySlug } from "@/api/collections";
import { ProductList } from "@/app/ui/organism/ProductList";

export default async function CollectionProductsPage({
    params,
}: {
    params: { collectionSlug: string; pageNumber: string };
}) {

    const response = await getCollectionProductsBySlug(params.collectionSlug);

    return (
        <>
            <section className="mx-auto max-w-screen-2xl p-12">
                <h1>
                    Produkty z kolekcji { response.collection.name }
                </h1>
				<ProductList products={response.products} />
			</section>
        </>
    )
}