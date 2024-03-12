import { cookies } from 'next/headers';
import Link from 'next/link';

import { ListOrdered, ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchInput } from '../atoms/searchInput';
import { GetCartItems } from '@/api/carts';


type NavLink = {
    href: string;
    role: string;
    label: string;
    exact: boolean;
}

const NavLinks: NavLink[] = [
    { href: "/", label: "Home", exact: true, role: "link"},
    { href: "/products", label: "All", exact: false, role: "link"},
    { href: "/categories/t-shirts", label: "T-Shirts", exact: false, role: "link" },
    { href: "/categories/hoodies", label: "Hoodies", exact: false, role: "link" },
    { href: "/categories/accessories", label: "Accessories", exact: false, role: "link"},
]


export async function NavBar() {
    const cartId = cookies().get("cartId")?.value;
    let count = 0;

    if (cartId) {
        const items = await GetCartItems(cartId);
        count = items.length;
    }

    return (
        <div className="bg-white md:flex justify-center sticky top-0">
            <div className="mobile-nav bg-white text-dark overflow-x-auto">
                <div className="flex justify-between items-center mx-auto max-w-md lg:px-12 lg:max-w-7xl h-full">
                    <nav role="navigation mx-auto">
                        <ul className="flex space-x-4 h-full">
                            {NavLinks.map((link, index) => (
                                <li key={index} className="w-32 text-center border-b-2 border-transparent hover:border-red-500 flex items-center">
                                    <ActiveLink role={link.role} href={link.href} exact={link.exact}>{link.label}</ActiveLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="flex justify-between items-center overflow-x-auto">
                <div className="flex items-center ml-2">
                    <Suspense fallback={<p>Loading data...</p>}>
                        <SearchInput />
                    </Suspense>
                </div>
                <div className="flex items-center mr-2">
                    <Link
                        href="/cart"
                        className="h-full group m-2 flex items-center p-2"
                    >
                        <ShoppingCart className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true" />
                        <span className='ml-2 text-sm font-medium'>{ count }</span>
                        <span className='sr-only'></span>
                    </Link>
                    <div className='w-32 flex justify-center align-middle'>
                        <SignedIn>
                            <Link
                                href="/orders"
                                className="h-full group m-2 flex items-center p-2"
                            >
                                <ListOrdered className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true" />
                            </Link>
                            <div className='p-2 flex justify-center align-middle items-center'>
                                <UserButton
                                    userProfileMode="navigation" />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                    </div>
                </div>
            </div>
        </div>
    );
}
