import React from 'react';
import Calendar from './calendar';
import GuestPicker from './guestPicker';
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
  GuestButton,
} from './bookingPortalStyles';
import { RightArrow, Arrowhead } from './svg';

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
      guestClick: 'none',
    };
    this.createPriceDiv = this.createPriceDiv.bind(this);
    this.createReviewDiv = this.createReviewDiv.bind(this);
    this.createDateSection = this.createDateSection.bind(this);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleCheckOutClick = this.handleCheckOutClick.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.customHandleCheckInClick = this.customHandleCheckInClick.bind(this);
    this.createGuestSection = this.createGuestSection.bind(this);
    this.handleGuestClick = this.handleGuestClick.bind(this);
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

  handleGuestClick(guestClick) {
    this.setState({
      guestClick: guestClick === 'none' ? 'block' : 'none',
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
    return (
      <div className="price-component">
        <Price>{`$${currentListing.price}`}</Price>
        <PriceText> per night</PriceText>
      </div>
    );
  }

  createReviewDiv() {
    const { currentListing } = this.state;
    const pct = currentListing.avg_rating_pct;
    const starsWidth = pct ? Math.round(pct / 100 * 50) : 0;
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

  createDateSection() {
    const {
      checkInClick,
      checkOutClick,
      checkInDate,
      checkOutDate,
      currentAvailability,
    } = this.state;
    const calClick = checkInClick === 'block' || checkOutClick === 'block' ? 'block' : 'none';
    return (
      <div style={{ position: 'relative' }}>
        <LabelName>Dates</LabelName>
        <DatesSection>
          <InputDate click={checkInClick} onClick={this.handleCheckInClick}>{checkInDate || 'Check-in'}</InputDate>
          <RightArrow width="28px" fill="rgb(72, 72, 72)" />
          <InputDate disableButton={checkInDate} click={checkOutClick} onClick={this.handleCheckOutClick}>{checkOutDate || 'Checkout'}</InputDate>
        </DatesSection>
        <div style={{ display: calClick }}>
          <Calendar
            availability={currentAvailability}
            dateSelect={this.handleDateSelect}
            checkSelect={this.customHandleCheckInClick}
          />
        </div>
      </div>
    );
  }

  createGuestSection() {
    const { guestClick, currentListing } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <LabelName>Guests</LabelName>
        <GuestButton onClick={() => this.handleGuestClick(guestClick)}>
          <div style={{ width: '95%' }}>1 guest</div>
          <Arrowhead transform="none" />
        </GuestButton>
        <div style={{ display: guestClick }}>
          <GuestPicker
            closeClick={() => this.handleGuestClick(guestClick)}
            maxGuests={currentListing.max_guests}
          />
        </div>
      </div>
    );
  }

  render() {
    const {
      currentListing,
    } = this.state;
    if (Object.keys(currentListing).length === 0) {
      return null;
    }
    return (
      <AppContainer>
        <TopSection>
          {this.createPriceDiv()}
          {this.createReviewDiv()}
        </TopSection>
        {this.createDateSection()}
        {this.createGuestSection()}
      </AppContainer>
    );
  }
}

export default BookingPortal;
