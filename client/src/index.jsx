import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
