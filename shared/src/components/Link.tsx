import { css } from 'styled-components';

export const MainLinkStyle = () => css`
    color: ${({ theme }) => theme['primary'].normal};
    text-decoration: none;

    :hover {
        color: ${({ theme }) => theme['primary'].darker};
        text-decoration: underline;
    }
`;
