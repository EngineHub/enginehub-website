import styled from 'styled-components';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { MainLinkStyle } from '@enginehub/shared';

export const MainLink = styled(Link)(MainLinkStyle);

export const MainOutboundLink = styled(OutboundLink)(MainLinkStyle);
