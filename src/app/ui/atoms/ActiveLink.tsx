"use client";

import type { UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";


interface ActiveLinkProps {
    href: string | UrlObject;
    children: ReactNode;
    exact?: boolean;
}

export const ActiveLink = ({ href, children, exact = false }: ActiveLinkProps) => {
    const pathname = usePathname();
    const resolvedHref = typeof href === 'string' ? { pathname: href } : href;
    let isActive = pathname === resolvedHref.pathname;

    if (!exact && resolvedHref.pathname) {
        isActive = pathname.startsWith(resolvedHref.pathname);
    }
    
    return (
        <Link
            href={resolvedHref}
            role="link"
            className={clsx('mx-auto text-gray-800 font-bold h-full line-h-60 hover:text-gray-600', isActive && 'underline')}
            aria-current={isActive ? 'page' : undefined}
            >
                {children}{isActive}
        </Link>
    );
};
