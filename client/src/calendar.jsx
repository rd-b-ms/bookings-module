import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const WeekdayHeader = styled.th`
  font-size: smaller;
  font-family: Roboto, sans-serif;
  text-align: center;
  color: rgb(117, 117, 117);
  padding-left: 5px;
  padding-right: 5px;
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
    };
    this.createHeader = this.getHeader.bind(this);
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
  }

  getYear() {
    const { dateContext } = this.state;
    return dateContext.format('Y');
  }

  getMonth() {
    const { dateContext } = this.state;
    return dateContext.format('MMMM');
  }

  getDaysInMonth() {
    const { dateContext } = this.state;
    return dateContext.daysInMonth();
  }

  getCurrentDate() {
    const { dateContext } = this.state;
    return dateContext.get('date');
  }

  getCurrentDay() {
    const { dateContext } = this.state;
    return dateContext.format('D');
  }

  firstDayOfMonth() {
    const { dateContext } = this.state;
    const firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  createHeader() {
    return this.weekdaysShort.map(day => (
      <WeekdayHeader key={day} className="week-day">
        {day.substring(0, 2)}
      </WeekdayHeader>
    ));
  }

  createBody() {
    const firstDay = this.firstDayOfMonth();
    const bodyArr = [];
    const bodyTable = [];

    for (let i = 0; i < firstDay; i += 1) {
      bodyArr.push(<td className="blank-day">{' '}</td>);
    }

    for (let j = 1; j <= this.getDaysInMonth; j += 1) {
      bodyArr.push(<td className="day"><span>{j}</span></td>);
    }

    return bodyArr;
  }


  render() {
    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header"> </tr>
          </thead>
          <tbody>
            {this.createHeader()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
