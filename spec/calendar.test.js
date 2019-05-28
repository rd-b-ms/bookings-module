import React from 'react';
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
    
  });
});
