import { styled } from 'styled-components';

const Label = styled.span`
    display: inline;
    padding: 0.2em 0.6em 0.3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25em;
`;

export const WarningLabel = styled(Label)`
    background-color: #f0ad4e;
`;

export const InfoLabel = styled(Label)`
    background-color: #777;
`;
