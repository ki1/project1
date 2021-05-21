import React from 'react';
import PropTypes from 'prop-types';
import { SHOW_CARROUSEL_ARROWS } from '../../../../config/setup/setup';
import ArrowButton from '../arrowButton';

const CarouselArrow = ({ onClickHandler, label, orientation }) => {
  if (!SHOW_CARROUSEL_ARROWS) return null;
  return (
    <ArrowButton
      type="button"
      onClick={onClickHandler}
      title={label}
      orientation={orientation}
    >
      -
    </ArrowButton>
  );
};

CarouselArrow.propTypes = {
  onClickHandler: PropTypes.func,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(['prev', 'next']),
};

CarouselArrow.defaultProps = {
  onClickHandler: () => false,
  label: '',
  orientation: 'prev',
};

export default CarouselArrow;
