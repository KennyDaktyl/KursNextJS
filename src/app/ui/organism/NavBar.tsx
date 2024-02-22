import { ActiveLink } from "../atoms/ActiveLink";

const NavLinks = [
    { href: "/", label: "Home", exact: true},
    { href: "/products/", label: "All", exact: false},
    { href: "/categories/t-shirts", label: "T-Shirts", exact: false},
    { href: "/categories/hoodies", label: "Hoodies", exact: false},
    { href: "/categories/accessories", label: "Accessories", exact: false},
]

export async function NavBar() {
    return (
        <nav>
            <ul className="mt-2 flex justify-center space-x-4">
                {NavLinks.map((link, index) => (
                    <li key={index}>
                        <ActiveLink href={link.href} exact={link.exact}>{link.label}</ActiveLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
