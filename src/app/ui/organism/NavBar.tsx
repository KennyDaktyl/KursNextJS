import { cookies } from 'next/headers';
import Link from 'next/link';

import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchInput } from '../atoms/searchInput';
import { GetCartItems } from '@/api/carts';


type NavLink = {
    href: string;
    label: string;
    exact: boolean;
}

const NavLinks: NavLink[] = [
    { href: "/", label: "Home", exact: true },
    { href: "/products/", label: "All", exact: false },
    { href: "/collections/", label: "Collections", exact: true },
    { href: "/categories/t-shirts/", label: "T-Shirts", exact: false },
    { href: "/categories/hoodies/", label: "Hoodies", exact: false },
    { href: "/categories/accessories/", label: "Accessories", exact: false },
]


export async function NavBar() {
    const cartId = cookies().get("cartId")?.value;
    let count = 0;

    if (cartId) {
        const items = await GetCartItems(cartId);
        count = items.length;
    }

    return (
        <nav className="bg-white h-60">
            <div className="flex justify-between items-center mx-auto max-w-md px-12 lg:max-w-7xl h-full">
                <ul className="flex space-x-4 h-full">
                    {NavLinks.map((link, index) => (
                        <li key={index} className="w-32 text-center border-b-2 border-transparent hover:border-red-500 flex items-center">
                            <ActiveLink href={link.href} exact={link.exact}>{link.label}</ActiveLink>
                        </li>
                    ))}
                </ul>
                    <Suspense fallback={<p>Loading data...</p>}>
                        <SearchInput />
                    </Suspense>
                <div className="flex w-full h-full items-center justify-center">
                    <Link
                        href="/cart"
                        className="w-full h-full group m-2 flex items-center p-2"
                    >
                        <ShoppingCart className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true" />
                        <span className='ml-2 text-sm font-medium'>{ count }</span>
                        <span className='sr-only'></span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
