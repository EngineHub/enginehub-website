import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media (min-width: 1200px) {
    width: 1030px;
  }
`;

export const ContainerPadded = styled(Container)`
  margin-top: 20px;
`;
