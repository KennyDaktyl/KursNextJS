import { ActiveLink } from "./ActiveLink";

interface PaginationProps {
    href: string;
    currentPage: number;
    totalProducts: number;
    itemsPerPage: number;
}

const Pagination = ({ currentPage, href, totalProducts, itemsPerPage }: PaginationProps) => {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const renderPageLinks = () => {
        const pageLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <li key={i}>
                    <ActiveLink role="link" href={`/${href}/${i}`} exact={true}>
                        {i}
                    </ActiveLink>
                </li>
            );
        }
        return pageLinks;
    };

    return (
        <nav aria-label="pagination" className="mx-auto">
            <ul className="flex justify-center mx-auto space-x-2">
                {currentPage > 1 && (
                    <>
                        <li>
                            <ActiveLink role="link" href={`/${href}/1`} exact={true}>
                                First Page
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink role="link" href={`/${href}/${currentPage - 1}`} exact={true}>
                                Previous
                            </ActiveLink>
                        </li>
                    </>
                )}
                {renderPageLinks()}
                {currentPage < totalPages && (
                    <li>
                        <ActiveLink role="link" href={`/${href}/${currentPage + 1}`} exact={true}>
                            Next
                        </ActiveLink>
                    </li>
                )}
                {currentPage < totalPages && (
                    <li>
                        <ActiveLink role="link" href={`/${href}/${totalPages}`} exact={true}>
                            Last Page
                        </ActiveLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
