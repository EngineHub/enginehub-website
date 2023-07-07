import Link from 'next/link';
import { styled } from 'styled-components';

export const BranchButtonList = styled.ul`
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;

    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;

    li + li {
        margin-left: 2px;
    }
`;

export const BranchButton = styled(Link)`
    padding: 5px 8px;
    border-radius: 4px;
    position: relative;
    display: block;
    color: #0059d1;
    text-decoration: none;

    :hover {
        text-decoration: none;
        background-color: #eee;
    }

    &.active {
        color: #fff;
        background-color: #0059d1;
    }
`;
