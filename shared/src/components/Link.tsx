import css from '@emotion/css';
import { PRIMARY } from '@shared/theme';

export const MainLinkStyle = () => css`
    color: ${PRIMARY.normal};
    text-decoration: none;

    :hover {
        color: ${PRIMARY.darker};
        text-decoration: underline;
    }
`;
