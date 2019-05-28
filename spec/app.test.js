import React from 'react';
import { shallow } from 'enzyme';
import BookingPortal from '../client/src/bookingPortal';

describe('<BookingPortal />', () => {
  it('Check that Price component is rendered when listing exists', () => {
    const wrapper = shallow(<BookingPortal />);
    wrapper.setState({
      currentListing: {
        price: 100,
        max_guests: 5,
      },
    });
    expect(wrapper.find('.price-component').length).toBe(1);
  });
  
  it('Check that Price component is not rendered when listing does not exist', () => {
    const wrapper = shallow(<BookingPortal />);
    expect(wrapper.find('.price-component').length).toBe(0);
  });
});
