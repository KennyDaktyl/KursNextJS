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
            className={clsx('text-blue-400 hover:text-blue-600', isActive && 'underline')}
            aria-current={isActive ? 'page' : undefined}
            >
                {children}{isActive}
        </Link>
    );
};
