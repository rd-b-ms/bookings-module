import React from 'react';
import ReactDOM from 'react-dom';
// import qs from 'query-string';
import Calendar from './calendar';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: null,
      currentAvailability: null,
    };
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

  render() {
    const { currentAvailability } = this.state;
    return (
      <div>
        <Calendar availability={currentAvailability} />
      </div>
    );
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
