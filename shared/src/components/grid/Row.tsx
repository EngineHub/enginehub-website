import styled from '@emotion/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
