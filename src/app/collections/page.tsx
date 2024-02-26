import { ActiveLink } from "../ui/atoms/ActiveLink";
import { getCollections } from "@/api/collections";


export default async function CollectionProductsPage() {

    const response = await getCollections();
    return (
        <>
            <section className="mx-auto max-w-screen-2xl px-12">
                <h1>Collections</h1>
                <ul>
                    {response.data.map(collection => (
                        <li key={collection.id}>
                            <ActiveLink href={`/collections/${collection.slug}`}>
                                {collection.name}
                            </ActiveLink>
                        </li>
                    ))}
                </ul>
			</section>
        </>
    )
}