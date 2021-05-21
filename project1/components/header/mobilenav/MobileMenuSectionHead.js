import React, { useContext } from 'react';
import Icon from '../../Icon';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const MobileMenuSectionHead = ({
  buttonText,
  faIcon,
  isCurrentEventKey,
  isExpander,
}) => {
  const theme = useContext(ThemeContext);
  const stateIcon = isCurrentEventKey ? faAngleUp : faAngleDown;

  return (
    <>
      <div className="head-section">
        <span className="head-section__icon">
          <Icon faIcon={faIcon} color="black" />
        </span>{' '}
        <span className="head-section__button-text">{buttonText}</span>
        {isExpander && (
          <span className="head-section__state-icon">
            <Icon faIcon={stateIcon} color="black" />
          </span>
        )}
      </div>
      <style jsx>{`
        .head-section {
          background-color: ${theme.colors.mobilemenubg};
          border-bottom: 1px solid ${theme.colors.primary};
          padding: 12px;
          line-height: 16px;
        }
        .head-section__icon {
          position: absolute;
        }
        .head-section__button-text {
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
          margin-left: 28px;
          text-transform: ${theme.text.transform};
        }
        .head-section__state-icon {
          color: #1c7430;
          position: absolute;
          right: 10px;
        }
      `}</style>
    </>
  );
};

export default MobileMenuSectionHead;

MobileMenuSectionHead.propTypes = {
  buttonText: PropTypes.string.isRequired,
  faIcon: PropTypes.object.isRequired,
  isCurrentEventKey: PropTypes.bool,
  isExpander: PropTypes.bool,
};
