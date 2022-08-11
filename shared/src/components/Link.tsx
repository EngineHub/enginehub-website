import styled, { css } from 'styled-components';
import { PRIMARY } from '../theme';

export const MainLinkStyle = () => css`
    color: ${PRIMARY.normal};
    text-decoration: none;
    cursor: pointer;

    :hover {
        color: ${PRIMARY.darker};
        text-decoration: underline;
    }
`;

export const MainLink = styled.a(MainLinkStyle);
