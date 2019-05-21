import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import {
  AppContainer,
  Price,
  PriceText,
} from './indexStyles';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: null,
      currentAvailability: null,
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
        <div>
          <div>{currentListing.num_reviews}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { currentAvailability } = this.state;
    return (
      <AppContainer>
        {this.createPriceDiv()}
        {/* {this.createReviewDiv()} */}
        {/* <div>
          <Calendar availability={currentAvailability} />
        </div> */}
      </AppContainer>
    );
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
