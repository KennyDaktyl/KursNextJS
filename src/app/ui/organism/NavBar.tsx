'use client'

import { useState } from 'react';
import { ActiveLink } from "../atoms/ActiveLink";

type NavLink = {
    href: string;
    label: string;
    exact: boolean;
}

const NavLinks: NavLink[] = [
    { href: "/", label: "Home", exact: true },
    { href: "/products/", label: "All", exact: false },
    { href: "/categories/t-shirts", label: "T-Shirts", exact: false },
    { href: "/categories/hoodies", label: "Hoodies", exact: false },
    { href: "/categories/accessories", label: "Accessories", exact: false },
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
        <nav>
            <ul className="mt-2 flex justify-center space-x-4">
                {NavLinks.map((link, index) => (
                    <li key={index}>
                        <ActiveLink href={link.href} exact={link.exact}>{link.label}</ActiveLink>
                    </li>
                ))}
                <form id="searchForm" method="GET" action="/search" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="query"
                        minLength={1}
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInput}
                        onKeyUp={handleKeyUp}
                    />
                </form>
            </ul>
        </nav>
    );
}
