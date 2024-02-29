import { ShoppingCart } from 'lucide-react';
import { Suspense } from 'react';
import { ActiveLink } from "../atoms/ActiveLink";
import { SearchInput } from '../atoms/searchInput';


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


export function NavBar(): JSX.Element {

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
                <ul className="flex items-center">
                    <Suspense fallback={<p>Loading data...</p>}>
                        <SearchInput />
                    </Suspense>
                    <ShoppingCart className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true"/>
                </ul>
            </div>
        </nav>
    );
}
