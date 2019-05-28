import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import Calendar from '../client/src/calendar';

function initializeCalendar(availability = [], dateSelect = () => {}, checkSelect = () => {}) {
  const wrapper = mount(<Calendar
    availability={availability}
    dateSelect={dateSelect}
    checkSelect={checkSelect}
  />);

  return wrapper;
}

describe('Calendar', () => {
  it('Checks if Calendar component is rendered', () => {
    const wrapper = shallow(<Calendar
      availability={[]}
      dateSelect={() => {}}
      checkSelect={() => {}}
    />);
    expect(wrapper.exists()).toBe(true);
  });

  it("Checks if Calendar's today is today", () => {
    const wrapper = initializeCalendar();
    const today = moment().format('MM/DD/Y');
    expect(wrapper.state().today.format('MM/DD/Y')).toEqual(today);
  });

  it('Check today on Calendar can be selected', () => {
    const wrapper = initializeCalendar();
    const today = moment().format('MMDY');
    wrapper.find(`td#date${today}`).simulate('click');
    expect(wrapper.update().state().fromDate).toBeTruthy();
  });

  it('Check day after today on Calendar can be selected', () => {
    const wrapper = initializeCalendar();
    const afterToday = moment().add(1, 'days').format('MMDY');
    wrapper.find(`td#date${afterToday}`).simulate('click');
    expect(wrapper.update().state().fromDate).toBeTruthy();
  });

  it('Check day before today on Calendar can not be selected', () => {
    const wrapper = initializeCalendar();
    const beforeToday = moment().subtract(1, 'days').format('MMDY');
    wrapper.find(`td#date${beforeToday}`).simulate('click');
    expect(wrapper.update().state().fromDate).toBeNull();
  });

  it('Check booked day can not be selected', () => {
    const wrapper = initializeCalendar([{ from_date: new Date('2019-05-01'), to_date: new Date('2019-05-03') }]);
    wrapper.setState({
      dateContext: moment('2019-05-15'),
      today: moment('2019-04-01'),
    });
    wrapper.find(`td#date${'0512019'}`).simulate('click');
    expect(wrapper.update().state().fromDate).toBeNull();
    wrapper.find(`td#date${'05112019'}`).simulate('click');
    expect(wrapper.update().state().fromDate).toBeTruthy();
  });

  it('Check left button goes to previous month when clicked', () => {
    const wrapper = initializeCalendar();
    wrapper.setState({
      today: moment(),
    });
    wrapper.find('svg#leftArrow').simulate('click');
    expect(wrapper.update().state().dateContext.format('MM')).toEqual(moment().subtract(1, 'M').format('MM'));
  });

  it('Check right button goes to next month when clicked', () => {
    const wrapper = initializeCalendar();
    wrapper.setState({
      today: moment(),
    });
    wrapper.find('svg#rightArrow').simulate('click');
    expect(wrapper.update().state().dateContext.format('MM')).toEqual(moment().add(1, 'M').format('MM'));
  });
});
