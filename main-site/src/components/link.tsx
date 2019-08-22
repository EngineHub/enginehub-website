import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { MainLinkStyle } from '@shared/components/link';

export const MainLink = styled(Link)(MainLinkStyle);

export const MainOutboundLink = styled(OutboundLink)(MainLinkStyle);
