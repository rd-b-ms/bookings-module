import React from 'react';
import PropTypes from 'prop-types';
import {
  GuestPickerContainer,
  CloseGuestDiv,
  CloseGuestButton,
  GuestSubText,
  GuestCategoryDiv,
  ButtonContainer,
} from './guestPickerStyles';
import { PlusSign, MinusSign } from './svg';

class GuestPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numAdults: 1,
      numChildren: 0,
      numInfants: 0,
    };
    this.checkMaxGuests = this.checkMaxGuests.bind(this);
    this.checkMinGuests = this.checkMinGuests.bind(this);
  }

  checkMinGuests(guestType) {
    const { numAdults, numChildren, numInfants } = this.state;
    if (guestType === 'Adults') {
      if (numAdults === 1) {
        return true;
      }
    }
    if (guestType === 'Children') {
      if (numChildren === 0) {
        return true;
      }
    }
    if (guestType === 'Infants') {
      if (numInfants === 0) {
        return true;
      }
    }
    return false;
  }

  checkMaxGuests(guestType) {
    const { numAdults, numChildren } = this.state;
    const { maxGuests } = this.props;
    const numGuests = numAdults + numChildren;
    if (guestType === 'Adults' || guestType === 'Children') {
      if (numGuests === maxGuests) {
        return true;
      }
    }
    return false;
  }

  createGuestRow(guestType, subtext, numGuests) {
    return (
      <GuestCategoryDiv>
        <div style={{ width: '70%' }}>
          <div style={{ fontSize: '16px', fontWeight: '500' }}>
            {guestType}
          </div>
          <GuestSubText>
            {subtext}
          </GuestSubText>
        </div>
        <ButtonContainer opacity={this.checkMinGuests(guestType) ? 0.3 : 1}>
          <MinusSign opacity={this.checkMinGuests(guestType) ? 0.3 : 1} />
        </ButtonContainer>
        <div style={{ width: '15%', textAlign: 'center' }}>
          {numGuests}
        </div>
        <ButtonContainer opacity={this.checkMaxGuests(guestType) ? 0.3 : 1}>
          <PlusSign opacity={this.checkMaxGuests(guestType) ? 0.3 : 1} />
        </ButtonContainer>
      </GuestCategoryDiv>
    );
  }

  render() {
    const { closeClick, maxGuests } = this.props;
    const { numAdults, numChildren, numInfants } = this.state;
    return (
      <GuestPickerContainer>
        {this.createGuestRow('Adults', null, numAdults)}
        {this.createGuestRow('Children', 'Ages 2-12', numChildren)}
        {this.createGuestRow('Infants', 'Under 2', numInfants)}
        <GuestSubText>
          {`${maxGuests} guests maximum. Infants don’t count`}
          <br />
          toward the number of guests.
        </GuestSubText>
        <CloseGuestDiv>
          <CloseGuestButton onClick={closeClick}>Close</CloseGuestButton>
        </CloseGuestDiv>
      </GuestPickerContainer>
    );
  }
}

GuestPicker.propTypes = {
  closeClick: PropTypes.instanceOf(Function).isRequired,
  maxGuests: PropTypes.number.isRequired,
};

export default GuestPicker;
