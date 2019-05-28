import React from 'react';
import jest from 'jest-mock';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import Calendar from '../client/src/calendar';

function initializeCalendar(dateSelect = () => {}, checkSelect = () => {}) {
  const wrapper = mount(<Calendar
    availability={[]}
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
});
