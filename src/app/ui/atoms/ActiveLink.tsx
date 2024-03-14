"use client";

import type { UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";


interface ActiveLinkProps {
    href: string | UrlObject;
    role: string;
    children: ReactNode;
    exact?: boolean;
}

export const ActiveLink = ({ href, role, children, exact = false }: ActiveLinkProps) => {
    const pathname = usePathname();
    const resolvedHref = typeof href === 'string' ? { pathname: href } : href;
    let isActive = pathname === resolvedHref.pathname;

    if (!exact && resolvedHref.pathname) {
        isActive = pathname.startsWith(resolvedHref.pathname);
    }
    
    return (
        <Link
            href={resolvedHref}
            role={role}
            className={clsx('mx-auto text-gray-800 font-bold h-full w-full line-h-60 hover:text-gray-950 dark:hover:text-zinc-100 dark:text-zinc-50', 
                isActive && 'text-gray-950 dark:text-white dark:dark:bg-gray-700 dark:text-zinc-50 rounded-2xl underline bg-slate-50 border-red-500')}
            aria-current={isActive ? 'page' : undefined}
            >
                {children}{isActive}
        </Link>
    );
};
