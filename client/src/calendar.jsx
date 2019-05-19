import React from 'react';
import moment from 'moment';
import {
  CalendarTable,
  HeaderButton,
  MonthYearHeader,
  WeekdayHeader,
  DayGrid,
} from './calendarStyles';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
    };
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

  createMonthYearHeader() {
    return (
      <MonthYearHeader colSpan="5">
        <span>{`${this.getMonth()} ${this.getYear()}`}</span>
      </MonthYearHeader>
    );
  }

  createWeekDayHeader() {
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
      bodyArr.push(<td className="blank-day" key={`blank-day-${i}`}>{' '}</td>);
    }

    for (let j = 1; j <= this.getDaysInMonth(); j += 1) {
      bodyArr.push(<DayGrid className="day" key={`day-${j}`}><span>{j}</span></DayGrid>);
    }

    let row = [];
    for (let k = 0; k < bodyArr.length; k += 1) {
      if (k % 7 !== 0) {
        row.push(bodyArr[k]);
      } else {
        const trRow = <tr key={`row-${k}`}>{row}</tr>;
        bodyTable.push(trRow);
        row = [bodyArr[k]];
      }
      if (k === bodyArr.length - 1) {
        const trRow = <tr key={`row-${k}`}>{row}</tr>;
        bodyTable.push(trRow);
      }
    }
    return bodyTable;
  }


  render() {
    return (
      <CalendarTable className="calendar">
        <thead>
          <tr className="calendar-header">
            <td>
              <HeaderButton>←</HeaderButton>
            </td>
            {this.createMonthYearHeader()}
            <td>
              <HeaderButton>→</HeaderButton>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>{this.createWeekDayHeader()}</tr>
          {this.createBody()}
        </tbody>
      </CalendarTable>
    );
  }
}

export default Calendar;
