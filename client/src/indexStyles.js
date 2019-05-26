import styled from 'styled-components';

const AppContainer = styled.section`
  font-family: Roboto, sans-serif;
  border: 1px solid rgb(228, 231, 231);
  height: 376px;
  width: 355px;
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
  padding-left: 3px;
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

const ReviewsSection = styled.div`
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InputDate = styled.div`
  border: none;
  color: ${(props) => {
    if (props.click === 'block') {
      return '#008489';
    }
    return 'rgb(117, 117, 117)';
  }};
  font-family: Roboto, sans-serif;
  font-size: 17px;
  font-weight: 300;
  height: 100%;
  width: 40%;
  background: ${(props) => {
    if (props.click === 'block') {
      return 'rgb(180, 241, 235)';
    }
    return 'transparent';
  }};
  padding-left: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  outline: none;
  pointer-events: ${(props) => {
    if (props.disableButton === null) {
      return 'none';
    }
    if (props.disableButton) {
      return 'auto';
    }
    return 'auto';
  }};
`;

const StarOuter = styled.span`
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' fill='${props => props.color}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: space;
  background-size: 9px 9px;
  height: 10px;
  display: block;
  width: 50px;
  position: relative;
  margin: 0;
  cursor: pointer;
`;

const StarInner = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: ${props => props.width};
  margin: 0;
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
  StarOuter,
  StarInner,
  ReviewsSection,
};
