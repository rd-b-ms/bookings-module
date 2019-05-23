import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  CalendarTable,
  HeaderButton,
  MonthYearHeader,
  WeekdayHeader,
  DayGrid,
  NADayGrid,
  CalendarContainer,
} from './calendarStyles';
import {
  RightArrow,
  LeftArrow,
} from './svg';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
      fromDate: null,
      toDate: null,
    };
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this);
    this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleSelectedDay = this.handleSelectedDay.bind(this);
    this.checkBookings = this.checkBookings.bind(this);
  }

  getYear() {
    const { dateContext } = this.state;
    return dateContext.format('Y');
  }

  getMonthNum() {
    const { dateContext } = this.state;
    return dateContext.format('MM');
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

  handleDayClick(id) {
    const { fromDate, toDate } = this.state;
    if (fromDate === null) {
      this.setState({
        fromDate: moment(`${this.getYear()}-${this.getMonth()}-${id}`),
      });
      return;
    }
    if (fromDate !== null && toDate === null) {
      const date = moment(`${this.getYear()}-${this.getMonth()}-${id}`);
      if (date > fromDate) {
        this.setState({
          toDate: date,
        });
      }
    }
  }

  handleSelectedDay(id) {
    const { fromDate, toDate } = this.state;
    const date = `${this.getYear()}-${this.getMonthNum()}-${id}`;
    const fdate = fromDate ? fromDate.format('Y-MM-D') : null;
    const tdate = toDate ? toDate.format('Y-MM-D') : null;

    if (fdate !== null) {
      if (date === fdate) {
        return {
          color: 1,
          hover: 0,
        };
      }
    }

    if (fdate !== null && tdate === null) {
      if (date > fdate) {
        return {
          color: 0,
          hover: 1,
        };
      }
    }

    if (tdate !== null) {
      if (fdate < date && tdate >= date) {
        return {
          color: 1,
          hover: 0,
        };
      }
    }

    return 0;
  }

  handleRightButtonClick() {
    const { dateContext } = this.state;
    const newdataContext = dateContext.add(1, 'M');
    this.setState({
      dateContext: newdataContext,
    });
  }

  handleLeftButtonClick() {
    const { dateContext } = this.state;
    const newdataContext = dateContext.subtract(1, 'M');
    this.setState({
      dateContext: newdataContext,
    });
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

  checkBookings(day) {
    const { availability } = this.props;
    const { today } = this.state;
    let newDay = day;
    if (day < 10) {
      newDay = `0${day}`;
    }
    const date = moment(`${this.getYear()}-${this.getMonthNum()}-${newDay}`);
    if (date.valueOf() < today.valueOf()) {
      return false;
    }
    for (let i = 0; i < availability.length; i += 1) {
      const fromDate = moment(availability[i].from_date);
      const toDate = moment(availability[i].to_date);
      if (!(fromDate.valueOf() > date.valueOf() || toDate.valueOf() < date.valueOf())) {
        return false;
      }
    }
    return true;
  }

  createBody() {
    const firstDay = this.firstDayOfMonth();
    const bodyArr = [];
    const bodyTable = [];

    for (let i = 0; i < firstDay; i += 1) {
      bodyArr.push(<td className="blank-day" key={`blank-day-${i}`}>{' '}</td>);
    }

    for (let j = 1; j <= this.getDaysInMonth(); j += 1) {
      if (this.checkBookings(j)) {
        bodyArr.push(<DayGrid select={this.handleSelectedDay(j)} onClick={() => (this.handleDayClick(j))} className="day" key={`day-${j}`}><span>{j}</span></DayGrid>);
      } else {
        bodyArr.push(<NADayGrid className="booked-day" key={`booked-day-${j}`}><span>{j}</span></NADayGrid>);
      }
    }

    let row = [];
    for (let k = 0; k < bodyArr.length; k += 1) {
      if (k % 7 !== 0) {
        row.push(bodyArr[k]);
      }

      if (k % 7 === 0) {
        const trRow = <tr key={`row-${k}`}>{row}</tr>;
        bodyTable.push(trRow);
        row = [bodyArr[k]];
      }
    }

    const trRow = <tr key={`row-${bodyArr.length}`}>{row}</tr>;
    bodyTable.push(trRow);
    return bodyTable;
  }


  render() {
    return (
      <CalendarContainer>
        <CalendarTable className="calendar">
          <thead>
            <tr className="calendar-header">
              <td>
                <HeaderButton onClick={this.handleLeftButtonClick}>
                  <LeftArrow width="19px" fill="rgb(130, 136, 138)" />
                </HeaderButton>
              </td>
              {this.createMonthYearHeader()}
              <td>
                <HeaderButton onClick={this.handleRightButtonClick}>
                  <RightArrow width="19px" fill="rgb(130, 136, 138)" />
                </HeaderButton>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>{this.createWeekDayHeader()}</tr>
            {this.createBody()}
          </tbody>
        </CalendarTable>
      </CalendarContainer>
    );
  }
}

Calendar.propTypes = {
  availability: PropTypes.instanceOf(Array).isRequired,
};

export default Calendar;
