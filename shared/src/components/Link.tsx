import styled, { css } from 'styled-components';
import { PRIMARY } from '../theme/index';
import Link from 'next/link';

export const MainLinkStyle = () => css`
    color: ${PRIMARY.normal};
    text-decoration: none;
    cursor: pointer;

    :hover {
        color: ${PRIMARY.darker};
        text-decoration: underline;
    }
`;

export const MainLink = styled(Link)(MainLinkStyle);
