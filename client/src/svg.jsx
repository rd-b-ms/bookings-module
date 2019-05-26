import React from 'react';
import PropTypes from 'prop-types';

function RightArrow(props) {
  const { width, fill } = props;
  return (
    <svg viewBox="0 0 1000 1000" style={{ width, fill }}>
      <path d="M694.4 242.4l249.1 249.1c11 11 11 21 0 32L694.4 772.7c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210.1-210.1H67.1c-13 0-23-10-23-23s10-23 23-23h805.4L662.4 274.5c-21-21.1 11-53.1 32-32.1z" fillRule="evenodd" />
    </svg>
  );
}

function LeftArrow(props) {
  const { width, fill } = props;
  return (
    <svg viewBox="0 0 1000 1000" style={{ width, fill }}>
      <path d="M336.2 274.5l-210.1 210h805.4c13 0 23 10 23 23s-10 23-23 23H126.1l210.1 210.1c11 11 11 21 0 32-5 5-10 7-16 7s-11-2-16-7l-249.1-249c-11-11-11-21 0-32l249.1-249.1c21-21.1 53 10.9 32 32z" fillRule="evenodd" />
    </svg>
  );
}

function Arrowhead(props) {
  const { transform } = props;
  return (
    <svg
      viewBox="0 0 18 18"
      style={{
        height: '16px',
        width: '16px',
        fill: '#484848',
        transform,
      }}
    >
      <path d="m16.29 4.3a1 1 0 1 1 1.41 1.42l-8 8a1 1 0 0 1 -1.41 0l-8-8a1 1 0 1 1 1.41-1.42l7.29 7.29z" fillRule="evenodd" />
    </svg>
  );
}

RightArrow.propTypes = {
  width: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
};

LeftArrow.propTypes = {
  width: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
};

Arrowhead.propTypes = {
  transform: PropTypes.string.isRequired,
};

export {
  RightArrow,
  LeftArrow,
  Arrowhead,
};
