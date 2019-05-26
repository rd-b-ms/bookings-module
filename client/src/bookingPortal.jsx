import React from 'react';
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
} from './bookingPortalStyles';
import { RightArrow } from './svg';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: {},
      currentAvailability: [],
      checkInClick: 'none',
      checkOutClick: 'none',
      checkInDate: null,
      checkOutDate: null,
    };
    this.createPriceDiv = this.createPriceDiv.bind(this);
    this.createReviewDiv = this.createReviewDiv.bind(this);
    this.createDateSection = this.createDateSection.bind(this);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleCheckOutClick = this.handleCheckOutClick.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.customHandleCheckInClick = this.customHandleCheckInClick.bind(this);
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('listingid')) {
      window.location.assign('/error');
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
        console.error(err)
      ));
  }

  handleDateSelect(checkInDate, checkOutDate) {
    this.setState({
      checkInDate,
      checkOutDate,
    });
  }

  customHandleCheckInClick(checkInClick, checkOutClick) {
    this.setState({
      checkInClick,
      checkOutClick,
    });
  }

  handleCheckInClick() {
    const { checkInClick } = this.state;
    this.setState({
      checkInClick: checkInClick === 'none' ? 'block' : 'none',
      checkOutClick: 'none',
    });
  }

  handleCheckOutClick() {
    const { checkOutClick } = this.state;
    this.setState({
      checkInClick: 'none',
      checkOutClick: checkOutClick === 'none' ? 'block' : 'none',
    });
  }

  createPriceDiv() {
    const { currentListing } = this.state;
    if (currentListing.price) {
      return (
        <div className="price-component">
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
    if (currentListing.num_reviews) {
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
    const {
      currentListing,
      checkInClick,
      checkOutClick,
      checkInDate,
      checkOutDate,
    } = this.state;
    if (Object.keys(currentListing).length > 0) {
      return (
        <div>
          <LabelName>Dates</LabelName>
          <DatesSection>
            <InputDate click={checkInClick} onClick={this.handleCheckInClick}>{checkInDate || 'Check-in'}</InputDate>
            <RightArrow width="28px" fill="rgb(72, 72, 72)" />
            <InputDate disableButton={checkInDate} click={checkOutClick} onClick={this.handleCheckOutClick}>{checkOutDate || 'Checkout'}</InputDate>
          </DatesSection>
        </div>
      );
    }
    return null;
  }

  render() {
    const { currentAvailability, checkInClick, checkOutClick } = this.state;
    const inputClick = checkInClick === 'block' || checkOutClick === 'block' ? 'block' : 'none';
    return (
      <AppContainer>
        <TopSection>
          {this.createPriceDiv()}
          {this.createReviewDiv()}
        </TopSection>
        <form>
          {this.createDateSection()}
        </form>
        <div style={{ display: inputClick }}>
          <Calendar
            availability={currentAvailability}
            dateSelect={this.handleDateSelect}
            checkSelect={this.customHandleCheckInClick}
          />
        </div>
      </AppContainer>
    );
  }
}

export default BookingPortal;
