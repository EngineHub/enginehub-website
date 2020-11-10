import styled from 'styled-components';
import React, { useMemo } from 'react';
import { LinkProviderProps } from '@shared/utils/LinkProvider';

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
    pageMaskAs?: string;
}

const Pagination: React.FC<PaginationProps & LinkProviderProps> = ({
    hasNextPage,
    currentPage,
    pageMask,
    pageMaskAs,
    linkProvider
}) => {
    const hasPrevPage = currentPage > 0;
    const MainLink = useMemo(() => linkProvider.getLinkComponent(), []);
    return (
        <PaginationBox>
            <li>
                {hasPrevPage ? (
                    <MainLink
                        href={pageMask.replace(':page', `${currentPage - 1}`)}
                        as={
                            pageMaskAs
                                ? pageMaskAs.replace(
                                      ':page',
                                      `${currentPage - 1}`
                                  )
                                : undefined
                        }
                    >
                        «
                    </MainLink>
                ) : (
                    <span>«</span>
                )}
            </li>
            {hasPrevPage && (
                <li>
                    <MainLink
                        href={pageMask.replace(':page', '0')}
                        as={
                            pageMaskAs
                                ? pageMaskAs.replace(':page', `0`)
                                : undefined
                        }
                    >
                        1
                    </MainLink>
                </li>
            )}
            <li>
                <span>{currentPage + 1}</span>
            </li>
            <li>
                {hasNextPage ? (
                    <MainLink
                        href={pageMask.replace(':page', `${currentPage + 1}`)}
                        as={
                            pageMaskAs
                                ? pageMaskAs.replace(
                                      ':page',
                                      `${currentPage + 1}`
                                  )
                                : undefined
                        }
                    >
                        »
                    </MainLink>
                ) : (
                    <span>»</span>
                )}
            </li>
        </PaginationBox>
    );
};

export default Pagination;
