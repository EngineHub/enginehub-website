import Link from 'next/link';
import type { FC } from 'react';

import {
    PaginationBox,
    PaginationEntry,
    PaginationEntryFirst
} from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    pageMask: string;
}

export const Pagination: FC<PaginationProps> = ({
    hasNextPage,
    currentPage,
    pageMask
}) => {
    const hasPrevPage = currentPage > 0;

    return (
        <ul className={PaginationBox}>
            <li className={`${PaginationEntry} ${PaginationEntryFirst}`}>
                {hasPrevPage ? (
                    <Link
                        href={pageMask.replace(':page', `${currentPage - 1}`)}
                    >
                        «
                    </Link>
                ) : (
                    <span>«</span>
                )}
            </li>
            {hasPrevPage && (
                <li className={PaginationEntry}>
                    <Link href={pageMask.replace(':page', '0')}>1</Link>
                </li>
            )}
            <li className={PaginationEntry}>
                <span>{currentPage + 1}</span>
            </li>
            <li className={PaginationEntry}>
                {hasNextPage ? (
                    <Link
                        href={pageMask.replace(':page', `${currentPage + 1}`)}
                    >
                        »
                    </Link>
                ) : (
                    <span>»</span>
                )}
            </li>
        </ul>
    );
};
