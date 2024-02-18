import { ActiveLink } from "./ActiveLink";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <ActiveLink key={i} href={`/products/${i}`}>
                <a aria-label={`Page ${i}`} className={currentPage === i ? 'active' : ''}>
                    {i}
                </a>
            </ActiveLink>
        );
    }

    return (
        <nav aria-label="pagination">
            {pages}
        </nav>
    );
};

export default Pagination;
