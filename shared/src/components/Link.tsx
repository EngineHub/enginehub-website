import { css } from 'styled-components';
import { PRIMARY } from '../theme/index';

export const MainLinkStyle = () => css`
    color: ${PRIMARY.normal};
    text-decoration: none;
    cursor: pointer;

    :hover {
        color: ${PRIMARY.darker};
        text-decoration: underline;
    }
`;
