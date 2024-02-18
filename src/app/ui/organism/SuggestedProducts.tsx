import { ProductList } from "./ProductList";
import { getProductsList } from "@/api/products"

const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
    
export const SuggestedProductsList = async () => {
    const products = await getProductsList();
    await sleep(5000)
    return <ProductList products={ products.slice(-4) } />
}
