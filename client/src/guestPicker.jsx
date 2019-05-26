import React from 'react';
import {
  GuestPickerContainer,
  CloseGuestDiv,
  CloseGuestButton,
  GuestSubText,
  GuestCategoryDiv,
} from './guestPickerStyles';

class GuestPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <GuestPickerContainer>
        <GuestCategoryDiv>
          <div style={{ width: '25%' }}>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Adults
            </div>
          </div>
        </GuestCategoryDiv>
        <GuestCategoryDiv>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Children
            </div>
            <GuestSubText>
              Ages 2–12
            </GuestSubText>
          </div>
        </GuestCategoryDiv>
        <GuestCategoryDiv>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Infants
            </div>
            <GuestSubText>
              Under 2
            </GuestSubText>
          </div>
        </GuestCategoryDiv>
        <GuestSubText>
          2 guests maximum. Infants don’t count toward the number of guests.
        </GuestSubText>
        <CloseGuestDiv>
          <CloseGuestButton>Close</CloseGuestButton>
        </CloseGuestDiv>
      </GuestPickerContainer>
    );
  }
}

export default GuestPicker;
