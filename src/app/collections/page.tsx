import type { Metadata } from "next";
import { ActiveLink } from "../ui/atoms/ActiveLink";
import { getCollections } from "@/api/collections";


export const generateMetadata = async(): Promise<Metadata> => {
    return {
        title: "Collections",
        description: "Collections",
    }
};


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