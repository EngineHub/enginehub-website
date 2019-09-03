import styled from '@emotion/styled';

export const InfoBox = styled.div`
    background-color: rgb(217, 237, 247);
    color: rgb(49, 112, 143);

    padding: 15px;
    margin-bottom: 23px;
    border: 1px solid rgb(188, 232, 241);
    border-radius: 4px;

    strong {
        font-weight: 700;
    }

    p + p {
        margin-top: 5px;
    }
`;
