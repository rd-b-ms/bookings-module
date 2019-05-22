import styled from 'styled-components';

const AppContainer = styled.section`
  font-family: Roboto, sans-serif;
  border: 1px solid rgb(228, 231, 231);
  height: 355px;
  width: 376px;
  margin: 0 auto;
  padding: 12px 24px;
`;

const Price = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: rgb(72, 72, 72);
`;

const PriceText = styled.span`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px
  color: rgb(72, 72, 72);
`;

export {
  AppContainer,
  Price,
  PriceText,
};
