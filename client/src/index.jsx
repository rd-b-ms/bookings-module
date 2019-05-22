import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import {
  AppContainer,
  Price,
  PriceText,
  NumReviews,
  TopSection,
} from './indexStyles';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: {},
      currentAvailability: [],
    };
    this.createPriceDiv = this.createPriceDiv.bind(this);
    this.createReviewDiv = this.createReviewDiv.bind(this);
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
    if (currentListing) {
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
    if (currentListing) {
      return (
        <div style={{ paddingTop: '5px' }}>
          <NumReviews>{currentListing.num_reviews}</NumReviews>
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
        {/* // <div>
        //   <Calendar availability={currentAvailability} />
        // </div> */}
      </AppContainer>
    );
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
