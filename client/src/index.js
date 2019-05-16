import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar.jsx';

class BookingPortal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <Calendar />
    </div>);
  }
}

ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));