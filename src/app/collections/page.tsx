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
                        <li key={collection.id} className="my-10">
                            <ActiveLink href={`/collections/${collection.slug}`}>
                                {collection.name}
                            </ActiveLink>
                            <p>{ collection.description }</p>
                        </li>
                    ))}
                </ul>
			</section>
        </>
    )
}