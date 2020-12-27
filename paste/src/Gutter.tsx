import styled from 'styled-components';

export const Gutter = styled.div`
    padding: 15px;
    float: left;
    text-align: right;
    color: ${({ theme }) => theme.gray.font.lighter};
    display: flex;
    line-height: 130%;
    white-space: pre;
`;
