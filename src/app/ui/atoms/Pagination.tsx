import { ActiveLink } from "./ActiveLink";

interface PaginationProps {
    currentPage: number;
    totalProducts: number;
    itemsPerPage: number;
}

const Pagination = ({ currentPage, totalProducts, itemsPerPage }: PaginationProps) => {
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const renderPageLinks = () => {
        const pageLinks = [];
        for (let i = 1; i <= totalPages; i++) {
            pageLinks.push(
                <li key={i}>
                    <ActiveLink href={`/products/${i}`} exact={true}>
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
                            <ActiveLink href={`/products/1`} exact={true}>
                                First Page
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink href={`/products/${currentPage - 1}`} exact={true}>
                                Previous
                            </ActiveLink>
                        </li>
                    </>
                )}
                {renderPageLinks()}
                {currentPage < totalPages && (
                    <li>
                        <ActiveLink href={`/products/${currentPage + 1}`} exact={true}>
                            Next
                        </ActiveLink>
                    </li>
                )}
                {currentPage < totalPages && (
                    <li>
                        <ActiveLink href={`/products/${totalPages}`} exact={true}>
                            Last Page
                        </ActiveLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
