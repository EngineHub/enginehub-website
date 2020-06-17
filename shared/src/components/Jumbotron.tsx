import styled from '@emotion/styled';

const JumbotronContainer = styled.div`
    padding: 20px;

    @media screen and (min-width: 768px) {
        padding-left: 40px;
        padding-right: 40px;
        padding-top: 32px;
        padding-bottom: 32px;
    }

    max-width: 700px;
    margin: 0 auto;
`;

export const JumbotronImageBox = styled.div`
    margin: 2rem auto;
    max-width: 400px;
`;

export const JumbotronText = styled.h2`
    margin: 20px 0;
    font-size: 21px;
    font-weight: 200;
    line-height: 1.7;
    text-align: center;
`;

export const JumbotronButtonBox = styled.div`
    display: flex;
    justify-content: center;

    a {
        margin: 1rem 0.5rem;
    }
`;

export default JumbotronContainer;
