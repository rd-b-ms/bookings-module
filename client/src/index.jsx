import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import {
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
} from './indexStyles';
import { RightArrow } from './svg';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: {},
      currentAvailability: [],
    };
    this.createPriceDiv = this.createPriceDiv.bind(this);
    this.createReviewDiv = this.createReviewDiv.bind(this);
    this.createDateSection = this.createDateSection.bind(this);
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('listingid')) {
      window.location.href = '/error';
      return;
    }
    fetch(`/booking?listingid=${params.get('listingid')}`, { method: 'GET' })
      .then(response => (
        response.json()
      ))
      .then(data => (
        this.setState({
          currentListing: data[0],
          currentAvailability: data[1],
        })
      ))
      .catch(err => (
        console.log(err)
      ));
  }

  createPriceDiv() {
    const { currentListing } = this.state;
    if (Object.keys(currentListing).length > 0) {
      return (
        <div>
          <Price>{`$${currentListing.price}`}</Price>
          <PriceText> per night</PriceText>
        </div>
      );
    }
    return null;
  }

  createReviewDiv() {
    const { currentListing } = this.state;
    const pct = currentListing.avg_rating_pct;
    const starsWidth = pct ? Math.round(pct / 100 * 50) : 0;
    if (Object.keys(currentListing).length > 0) {
      return (
        <ReviewsSection>
          <StarOuter color="rgb(228, 231, 231)">
            <StarInner width={`${starsWidth}px`}>
              <StarOuter color="rgb(18, 132, 136)" />
            </StarInner>
          </StarOuter>
          <NumReviews>{currentListing.num_reviews}</NumReviews>
        </ReviewsSection>
      );
    }
    return null;
  }

  createDateSection() {
    const { currentListing } = this.state;
    if (Object.keys(currentListing).length > 0) {
      return (
        <div>
          <label htmlFor="check-in">
            <LabelName>Dates</LabelName>
            <DatesSection>
              <InputDate id="check-in" placeholder="Check-in" />
              <RightArrow width="28px" fill="rgb(72, 72, 72)" />
              <InputDate id="check-out" placeholder="Checkout" />
            </DatesSection>
          </label>
        </div>
      );
    }
    return null;
  }

  render() {
    const { currentAvailability } = this.state;
    return (
      <AppContainer>
        <TopSection>
          {this.createPriceDiv()}
          {this.createReviewDiv()}
        </TopSection>
        <form>
          {this.createDateSection()}
        </form>
        <div>
          <Calendar availability={currentAvailability} />
        </div>
      </AppContainer>
    );
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
