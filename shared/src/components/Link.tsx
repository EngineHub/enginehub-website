import { css } from 'styled-components';
import { PRIMARY } from '../theme';

export const MainLinkStyle = () => css`
    color: ${PRIMARY.normal};
    text-decoration: none;

    :hover {
        color: ${PRIMARY.darker};
        text-decoration: underline;
    }
`;
