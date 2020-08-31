import styled from 'styled-components';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { Link } from 'gatsby';
import {
    MainButtonStyle,
    PurpleButtonStyle,
    BlueButtonStyle
} from '@shared/components/Button';

export const GrayOutboundButton = styled(OutboundLink)(MainButtonStyle);
export const PurpleOutboundButton = styled(OutboundLink)(PurpleButtonStyle);
export const BlueOutboundButton = styled(OutboundLink)(BlueButtonStyle);

export const BlueButton = styled(Link)(BlueButtonStyle);
