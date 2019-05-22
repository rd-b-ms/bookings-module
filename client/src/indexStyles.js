import styled from 'styled-components';

const AppContainer = styled.section`
  font-family: Roboto, sans-serif;
  border: 1px solid rgb(228, 231, 231);
  height: 355px;
  width: 376px;
  margin: 0 auto;
  padding: 0px 24px;
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

const NumReviews = styled.div`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px
  color: rgb(72, 72, 72);
  cursor: pointer;
`;

const TopSection = styled.div`
  border-bottom: 1px solid rgb(228, 231, 231);
  padding: 17px 0px;
`;

const LabelName = styled.p`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 12px
  color: rgb(72, 72, 72);
  margin-top: 20px;
  margin-bottom: 0px;
`;

const DatesSection = styled.div`
  font-family: Roboto, sans-serif;
  border: 1px solid rgb(228, 231, 231);
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
`;

const InputDate = styled.input`
  border: none;
  font-family: Roboto, sans-serif;
  font-size: 17px;
  height: 100%;
  width: 40%;
  background: transparent;
  padding-left: 14px;
  cursor: pointer;
`;

export {
  AppContainer,
  Price,
  PriceText,
  NumReviews,
  TopSection,
  LabelName,
  DatesSection,
  InputDate,
};
