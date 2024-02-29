'use client'
import { useRouter } from 'next/navigation';
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
    
    const router = useRouter();
    const delayTime = 500; 
    
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); 
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearchQuery(value); 
        if (value.length >= 2) {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
            const timer = setTimeout(() => {
                const queryParamString = new URLSearchParams({ query: value }).toString();
                router.push(`/search?${queryParamString}`);
                setSearchQuery("");
            }, delayTime);
            setTypingTimer(timer);
        }
    };

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
                    <div className="flex bg-white border border-gray-300 rounded-full">
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
                    </div>
                    <ShoppingCart className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true"/>
                </ul>
            </div>
        </nav>
    );
}
