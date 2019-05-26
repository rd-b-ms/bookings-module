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

class GuestPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { closeClick } = this.props;
    return (
      <GuestPickerContainer>
        <GuestCategoryDiv>
          <div style={{ width: '70%' }}>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Adults
            </div>
          </div>
          <ButtonContainer opacity={0.3} />
          <div style={{ width: '15%', textAlign: 'center' }}>
            1
          </div>
          <ButtonContainer opacity={1} />
        </GuestCategoryDiv>
        <GuestCategoryDiv>
          <div style={{ width: '70%' }}>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Children
            </div>
            <GuestSubText>
              Ages 2–12
            </GuestSubText>
          </div>
          <ButtonContainer opacity={0.3} />
          <div style={{ width: '15%', textAlign: 'center' }}>
            1
          </div>
          <ButtonContainer opacity={1} />
        </GuestCategoryDiv>
        <GuestCategoryDiv>
          <div style={{ width: '70%' }}>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              Infants
            </div>
            <GuestSubText>
              Under 2
            </GuestSubText>
          </div>
          <ButtonContainer opacity={0.3} />
          <div style={{ width: '15%', textAlign: 'center' }}>
            1
          </div>
          <ButtonContainer opacity={1} />
        </GuestCategoryDiv>
        <GuestSubText>
          2 guests maximum. Infants don’t count toward the number of guests.
        </GuestSubText>
        <CloseGuestDiv>
          <CloseGuestButton onClick={closeClick}>Close</CloseGuestButton>
        </CloseGuestDiv>
      </GuestPickerContainer>
    );
  }
}

GuestPicker.propTypes = {
  closeClick: PropTypes.string.isRequired,
};

export default GuestPicker;
