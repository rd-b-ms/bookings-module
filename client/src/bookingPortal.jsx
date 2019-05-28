import React from 'react';
import moment from 'moment';
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
  BookButton,
  FootNote,
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
      numGuests: 1,
      numInfants: 0,
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
    this.handleBookClick = this.handleBookClick.bind(this);
    this.handleNumGuestsClick = this.handleNumGuestsClick.bind(this);
    this.printTotalGuests = this.printTotalGuests.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
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

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    if (this.calNode.contains(e.target)) {
      return;
    }
    this.customHandleCheckInClick('none', 'none');
  }

  handleDateSelect(checkInDate, checkOutDate) {
    this.setState({
      checkInDate,
      checkOutDate,
    });
  }

  handleBookClick() {
    const {
      numGuests,
      numInfants,
      checkInDate,
      checkOutDate,
      currentListing,
      currentAvailability,
    } = this.state;
    if (checkInDate && checkOutDate) {
      fetch('/booking', {
        method: 'POST',
        body: JSON.stringify({
          listingId: currentListing.listing_id,
          fromDate: new Date(checkInDate.valueOf()),
          toDate: new Date(checkOutDate.valueOf()),
          numGuests,
          numInfants,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((data) => {
          this.handleDateSelect(null, null);
          currentAvailability.push(data);
          this.setState({
            currentAvailability,
            numGuests: 1,
            numInfants: 0,
          });
          const fromDate = moment(data.from_date);
          const toDate = moment(data.to_date);
          console.log(`Listing ${data.listing_id} has been booked from ${fromDate.format('MM/DD/Y')} to ${toDate.format('MM/DD/Y')}`);
        })
        .catch(err => console.error(err));
    } else if (checkInDate) {
      this.customHandleCheckInClick('none', 'block');
    } else {
      this.customHandleCheckInClick('block', 'none');
    }
  }

  handleGuestClick(guestClick) {
    this.setState({
      guestClick: guestClick === 'none' ? 'block' : 'none',
    });
  }

  handleNumGuestsClick(numGuests, numInfants) {
    this.setState({
      numGuests,
      numInfants,
    });
  }

  printTotalGuests() {
    const { numGuests, numInfants } = this.state;
    const guestsMessage = `${numGuests} guest${numGuests > 1 ? 's' : ''}`;
    const infantsMessage = numInfants > 0 ? `, ${numInfants} infant${numInfants > 1 ? 's' : ''}` : '';
    return guestsMessage + infantsMessage;
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
      guestClick: 'none',
    });
  }

  handleCheckOutClick() {
    const { checkOutClick } = this.state;
    this.setState({
      checkInClick: 'none',
      checkOutClick: checkOutClick === 'none' ? 'block' : 'none',
      guestClick: 'none',
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
      <div style={{ position: 'relative' }} ref={(calNode) => { this.calNode = calNode; }}>
        <LabelName>Dates</LabelName>
        <DatesSection>
          <InputDate id="checkin" click={checkInClick} onClick={this.handleCheckInClick}>{checkInDate ? checkInDate.format('MM/DD/Y') : 'Check-in'}</InputDate>
          <RightArrow width="28px" fill="rgb(72, 72, 72)" />
          <InputDate id="checkout" disableButton={checkInDate} click={checkOutClick} onClick={this.handleCheckOutClick}>{checkOutDate ? checkOutDate.format('MM/DD/Y') : 'Checkout'}</InputDate>
        </DatesSection>
        <div id="calendar-container" style={{ display: calClick }}>
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
          <div style={{ width: '95%' }}>{this.printTotalGuests()}</div>
          <Arrowhead transform="none" />
        </GuestButton>
        <div style={{ display: guestClick }}>
          <GuestPicker
            closeClick={() => this.handleGuestClick(guestClick)}
            numGuestsClick={this.handleNumGuestsClick}
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
        <BookButton onClick={this.handleBookClick}>Book</BookButton>
        <FootNote>You won’t be charged yet</FootNote>
      </AppContainer>
    );
  }
}

export default BookingPortal;
