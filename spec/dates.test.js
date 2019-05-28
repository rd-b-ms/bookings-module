import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import BookingPortal from '../client/src/bookingPortal';

function initializeBookingPortal() {
  const wrapper = mount(<BookingPortal />);
  wrapper.setState({
    currentListing: {
      price: 100,
      max_guests: 5,
    },
  });

  return wrapper;
}

describe('Dates Section', () => {
  it('Check that check-in button is toggled when clicked', () => {
    const wrapper = initializeBookingPortal();
    let styles = getComputedStyle(wrapper.find('div#checkin').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('transparent');
    expect(styles.getPropertyValue('color')).toBe('rgb(117, 117, 117)');
    wrapper.instance().handleCheckInClick();
    //Need to re-render/update component after click
    styles = getComputedStyle(wrapper.update().find('div#checkin').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('rgb(180, 241, 235)');
    expect(styles.getPropertyValue('color')).toBe('rgb(0, 132, 137)');
    wrapper.instance().handleCheckInClick();
    //Need to re-render/update component after click
    styles = getComputedStyle(wrapper.update().find('div#checkin').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('transparent');
    expect(styles.getPropertyValue('color')).toBe('rgb(117, 117, 117)');
  });

  it('Check that check-out button is toggled when clicked', () => {
    const wrapper = initializeBookingPortal();
    let styles = getComputedStyle(wrapper.find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('transparent');
    expect(styles.getPropertyValue('color')).toBe('rgb(117, 117, 117)');
    wrapper.instance().handleCheckOutClick();
    //Need to re-render/update component after click
    styles = getComputedStyle(wrapper.update().find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('rgb(180, 241, 235)');
    expect(styles.getPropertyValue('color')).toBe('rgb(0, 132, 137)');
    wrapper.instance().handleCheckOutClick();
    //Need to re-render/update component after click    
    styles = getComputedStyle(wrapper.update().find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('transparent');
    expect(styles.getPropertyValue('color')).toBe('rgb(117, 117, 117)');
  });

  it('Check that check-out button is disabled when check-in button is clicked', () => {
    const wrapper = initializeBookingPortal();
    let styles = getComputedStyle(wrapper.find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('pointer-events')).toBe('none');
    wrapper.instance().handleCheckInClick();
    //Need to re-render/update component after click
    styles = getComputedStyle(wrapper.update().find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('pointer-events')).toBe('none');
  });

  it('Check that check-out button is enabled when check-in date is selected', () => {
    const wrapper = initializeBookingPortal();
    let styles = getComputedStyle(wrapper.find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('transparent');
    expect(styles.getPropertyValue('color')).toBe('rgb(117, 117, 117)');
    expect(styles.getPropertyValue('pointer-events')).toBe('none');
    wrapper.instance().handleDateSelect(moment('2019-05-11'), null);
    wrapper.instance().customHandleCheckInClick('none', 'block');
    //Need to re-render/update component after click
    styles = getComputedStyle(wrapper.update().find('div#checkout').getDOMNode());
    expect(styles.getPropertyValue('background')).toBe('rgb(180, 241, 235)');
    expect(styles.getPropertyValue('color')).toBe('rgb(0, 132, 137)');
    expect(styles.getPropertyValue('pointer-events')).toBe('auto');
  });

  it('Check that calendar component is displayed when check-in button is clicked', () => {
    const wrapper = initializeBookingPortal();
    let styles = getComputedStyle(wrapper.find('div#calendar-container').getDOMNode());
    expect(styles.getPropertyValue('display')).toBe('none');
    wrapper.instance().handleCheckInClick();
    styles = getComputedStyle(wrapper.find('div#calendar-container').getDOMNode());
    expect(styles.getPropertyValue('display')).toBe('block');
  });
});
