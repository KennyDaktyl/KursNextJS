"use client";

import type { UrlObject } from "url";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";


interface ActiveLinkProps {
    href: string | UrlObject;
    children: ReactNode;
}

export const ActiveLink = ({ href, children }: ActiveLinkProps) => {
    const pathname = usePathname();
    const resolvedHref = typeof href === 'string' ? { pathname: href } : href;
    const isActive = pathname === resolvedHref.pathname;

    return (
        <Link
            href={resolvedHref}
            className={clsx('text-blue-400 hover:text-blue-600', isActive && 'underline')}>
                {children}
        </Link>
    );
};
