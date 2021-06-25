import styled from 'styled-components';
import React, { useContext } from 'react';
import { LinkProviderContext } from '../utils/LinkProvider';

const PaginationBox = styled.ul`
    margin-top: 0;
    display: inline-block;
    padding-left: 0;
    margin: 23px 0;
    border-radius: 4px;

    li {
        display: inline;

        * {
            position: relative;
            float: left;
            padding: 6px 12px;
            line-height: 1.7;
            text-decoration: none;
            color: #0059d1;
            background-color: #fff;
            border: 1px solid #ddd;
            margin-left: -1px;
        }

        span {
            color: #777;
            background-color: #fff;
            border-color: #ddd;
            cursor: not-allowed;
        }
    }

    li:first-of-type {
        * {
            margin-left: 0;
            border-bottom-left-radius: 4px;
            border-top-left-radius: 4px;
        }
    }
`;

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
    pageMask: string;
}

export const Pagination: React.FC<PaginationProps> = ({
    hasNextPage,
    currentPage,
    pageMask
}) => {
    const hasPrevPage = currentPage > 0;
    const Link = useContext(LinkProviderContext);

    return (
        <PaginationBox>
            <li>
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
                <li>
                    <Link href={pageMask.replace(':page', '0')}>1</Link>
                </li>
            )}
            <li>
                <span>{currentPage + 1}</span>
            </li>
            <li>
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
        </PaginationBox>
    );
};
