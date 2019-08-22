import styled from '@emotion/styled';

const JumbotronContainer = styled.div`
    padding: 20px;

    @media screen and (min-width: 768px) {
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 32px;
        padding-bottom: 32px;
    }

    border-radius: 6px;
    background-color: #eee;
`;

export const JumbotronText = styled.h2`
    margin: 0 0 0 10px;
    font-size: 21px;
    font-weight: 200;
    line-height: 1.7;
`;

export const JumbotronButtonBox = styled.div`
    margin: 0 0 0 10px;
`;

export default JumbotronContainer;
