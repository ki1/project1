import React, { useContext } from 'react';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const FacetedNavToggle = ({ buttonText, isExpander, eventKey, callback }) => {
  const theme = useContext(ThemeContext);
  const currentEventKey = useContext(AccordionContext);
  const isCurrentEventKey = currentEventKey === eventKey;
  const stateIcon = isCurrentEventKey ? faAngleUp : faAngleDown;
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const iconColor = theme.colors.primaryonwhite;

  return (
    <>
      <button
        type="button"
        onClick={decoratedOnClick}
        className="head-section__button"
      >
        <div className="head-section">
          <span className="head-section__button-text">{buttonText}</span>
          {isExpander && (
            <span className="head-section__state-icon">
              <Icon faIcon={stateIcon} color={iconColor} />
            </span>
          )}
        </div>
      </button>
      <style jsx>{`
        .head-section {
          background-color: ${theme.colors.mobilemenubg};
          padding: 9px 8px;
          line-height: 16px;
          position: relative;
        }
        .head-section__button {
          border: 0;
          text-align: left;
          margin: 0;
          padding: 0;
          width: 100%;
        }
        .head-section__button-text {
          color: ${theme.colors.primaryonwhite};
          font-size: 13px;
          font-weight: bold;
          line-height: 13px;
        }
        .head-section__state-icon {
          color: ${theme.colors.primaryonwhite};
          position: absolute;
          right: 8px;
        }
      `}</style>
    </>
  );
};

export default FacetedNavToggle;

FacetedNavToggle.propTypes = {
  buttonText: PropTypes.string.isRequired,
  isCurrentEventKey: PropTypes.bool,
  isExpander: PropTypes.bool,
};
