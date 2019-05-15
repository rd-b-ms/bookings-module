import React from 'react';
import ReactDOM from 'react-dom';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>Booking Portal</div>);
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));