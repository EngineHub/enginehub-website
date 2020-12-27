import { css } from 'styled-components';
import { ColorPalettes } from '@shared/theme';

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

const ButtonColorStyle = (palette: ColorPalettes) => css`
    color: ${({ theme }) => theme[palette].font.inverse};

    background-color: ${({ theme }) => theme[palette].normal};
    border: 1px solid ${({ theme }) => theme[palette].accent};

    transition: box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out;

    :disabled {
        opacity: 0.7;
    }

    :hover,
    :focus {
        background-color: ${({ theme }) => theme[palette].lighter};
        box-shadow: 0 0 0 1px ${({ theme }) => theme[palette].accent} inset;
    }
`;

export const MainButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle('secondary')}
`;

export const PurpleButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle('brand')}
`;

export const BlueButtonStyle = () => css`
    ${BaseButtonLayout()}
    ${ButtonColorStyle('primary')}
`;
