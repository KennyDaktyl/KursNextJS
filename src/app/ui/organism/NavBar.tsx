'use client'

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ActiveLink } from "../atoms/ActiveLink";

type NavLink = {
    href: string;
    label: string;
    exact: boolean;
}

const NavLinks: NavLink[] = [
    { href: "/", label: "Home", exact: true },
    { href: "/products/", label: "All", exact: false },
    { href: "/collections/", label: "Collections", exact: false },
    { href: "/categories/t-shirts/", label: "T-Shirts", exact: false },
    { href: "/categories/hoodies/", label: "Hoodies", exact: false },
    { href: "/categories/accessories/", label: "Accessories", exact: false },
]

export function NavBar(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
    const delayTime = 500;

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        form.submit();
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (value.length >= 2) {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
            const timer = setTimeout(() => {
                const form = document.getElementById('searchForm') as HTMLFormElement;
                if (form) {
                    form.submit();
                }
            }, delayTime);
            setTypingTimer(timer);
        }
    };

    return (
    <nav className="bg-white h-60">
        <div className="flex justify-between items-center mx-auto max-w-md px-12 lg:max-w-7xl h-full">
            <ul className="flex space-x-4 h-full">
                {NavLinks.map((link, index) => (
                    <li key={index} className="w-32 text-center	border-b-2 border-transparent hover:border-red-500 flex items-center">
                        <ActiveLink href={link.href} exact={link.exact}>{link.label}</ActiveLink>
                    </li>
                ))}
            </ul>
            <ul className="flex items-center">
                <form id="searchForm" role='searchbox' method="GET" action="/search" onSubmit={handleSubmit} className="flex bg-white border border-gray-300 rounded-full">
                    <input 
                        type="text" 
                        name="query"
                        minLength={1}
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInput}
                        onKeyUp={handleKeyUp}
                        className="bg-white text-gray-700 px-3 py-1 rounded-full focus:outline-none"
                    />
                </form>
                <ShoppingCart className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true"/>
            </ul>
        </div>
    </nav>
    );
}
