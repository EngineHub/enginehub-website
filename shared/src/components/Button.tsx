import styled, { css } from 'styled-components';
import type { ColorPalette } from '../theme/index';
import { SECONDARY, BRAND, PRIMARY } from '../theme/index';
import Link from 'next/link';

const BaseButtonLayout = () => css`
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.7;
    text-decoration: none;
    border-radius: 5px;

    :disabled {
        cursor: not-allowed;
    }
`;

const ButtonColorStyle = (palette: ColorPalette) => css`
    color: ${palette.font};

    background-color: ${palette.normal};
    border: 1px solid ${palette.accent};

    transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;

    :disabled {
        opacity: 0.7;
    }

    :hover,
    :focus {
        background-color: ${palette.lighter};
        box-shadow: 0 0 0 1px ${palette.accent} inset;
    }
`;

export const MainButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle(SECONDARY)}
`;

export const PurpleButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle(BRAND)}
`;

export const BlueButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle(PRIMARY)}
`;

export const GrayButton = styled(Link)(MainButtonStyle);
export const PurpleButton = styled(Link)(PurpleButtonStyle);
export const BlueButton = styled(Link)(BlueButtonStyle);
