import { ActiveLink } from "./ActiveLink";

interface PaginationProps {
    currentPage: number;
    isLastPage: boolean
}

const Pagination = ({ currentPage, isLastPage }: PaginationProps) => {

    return (
        <nav aria-label="pagination" className="mx-auto">
            <ul className="flex justify-center mx-auto space-x-2">
                {currentPage > 1 && (
                    <>
                        {currentPage > 2 && (
                            <li>
                                <ActiveLink href={`/products/1`} exact={true}>
                                    First Page
                                </ActiveLink>
                            </li>)
                        }
                        <li>
                            <ActiveLink href={`/products/${currentPage - 1}`} exact={true}>
                                {currentPage - 1}
                            </ActiveLink>
                        </li>
                    </>
                )}
                <li>
                    <ActiveLink href={`/products/${currentPage}`} exact={true}>
                        {currentPage}
                    </ActiveLink>
                </li>
                {!isLastPage && (
                    <li>
                        <ActiveLink href={`/products/${currentPage + 1}`} exact={true}>
                            {currentPage + 1}
                        </ActiveLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
