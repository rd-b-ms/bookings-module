import React from 'react';
import ReactDOM from 'react-dom';
// import qs from 'query-string';
import Calendar from './calendar';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListing: null,
      fromDate: null,
      toDate: null,
    };
  }

  componentDidMount() {
    fetch('/booking?listingid=2', { method: 'GET' })
      .then(response => (
        response.json()
      ))
      .then(data => (
        this.setState({
          currentListing: data
        })
      ))
      .catch(err => (
        console.log(err)
      ));
  }

  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
