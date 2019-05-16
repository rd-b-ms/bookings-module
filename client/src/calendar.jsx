/* eslint-disable class-methods-use-this */
import React from 'react';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: moment(),
    };
    this.getHeader = this.getHeader.bind(this);
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
  }

  getHeader() {
    return this.weekdaysShort.map(day => (
      <th key={day} className="week-day">
        {day}
      </th>
    ));
  }

  render() {
    const { today } = this.state;
    return (
      <div>
        <h4>Calendar</h4>
        {this.getHeader()}
        <div>
          {today}
        </div>
      </div>
    );
  }
}

export default Calendar;
