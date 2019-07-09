import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

const MainLinkStyle = () => css`
    color: rgb(0, 89, 209);
    text-decoration: none;

    :hover {
        color: #003884;
        text-decoration: underline;
    }
`;

export const MainLink = styled(Link)(MainLinkStyle);

export const MainOutboundLink = styled(OutboundLink)(MainLinkStyle);
