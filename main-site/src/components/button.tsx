import styled from '@emotion/styled';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { Link } from 'gatsby';
import {
    MainButtonStyle,
    PurpleButtonStyle,
    BlueButtonStyle
} from '@shared/components/button';

export const GrayOutboundButton = styled(OutboundLink)(MainButtonStyle);
export const PurpleOutboundButton = styled(OutboundLink)(PurpleButtonStyle);
export const BlueOutboundButton = styled(OutboundLink)(BlueButtonStyle);

export const BlueButton = styled(Link)(BlueButtonStyle);
