import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ThemeContext from '../../../providers/ThemeProvider';

/**
 * Rounded primary button with variants
 *
 * .full-width        span the full width of container
 * .inverse-button    white background, main colour text
 * .outline           main colour text and outline, white background;
 * .italic            make text italic
 * .compact           smaller text, less padding (useful for multi line button text)
 */
const PrimaryButton = ({
  onClick = () => {},
  buttonRef,
  id,
  style,
  className = '',
  ariaLabel,
  children,
  disabled = false,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <button
        id={id}
        ref={buttonRef}
        style={style}
        onClick={onClick}
        className={classNames('primary-button', className)}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>

      <style jsx>{`
        .primary-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${theme.colors.dealviewbutton};
          text-align: center;
          color: #ffffff;
          font-weight: bold;
          font-size: 18px;
          border-radius: 20px;
          border: none;
          text-decoration: none;
          text-transform: uppercase;
          outline: none;
          min-width: 120px;
          min-height: 40px;
          padding: 7px 20px;
        }
        .primary-button.full-width {
          width: 100%;
        }
        .primary-button.invert {
          background-color: #ffffff;
          color: ${theme.colors.dealviewbutton};
        }
        .primary-button.outline {
          color: ${theme.colors.dealviewbutton};
          border: 3px solid ${theme.colors.dealviewbutton};
          background-color: #ffffff;
          padding: 4px 17px;
        }
        .primary-button.italic {
          font-style: italic;
        }
        .primary-button.compact {
          font-size: 14px;
          white-space: normal;
          padding: 7px 10px;
          line-height: 1.2em;
          width: 140px;
        }
        .primary-button.large {
          border-radius: 60px;
        }
        .primary-button.margin {
          margin-bottom: 8px;
        }
        .primary-button:disabled {
          color: #ffffff;
          background-color: #cccccc;
        }
        .primary-button.outline:disabled {
          color: #ffffff;
          border: 3px solid #cccccc;
        }
      `}</style>
    </>
  );
};

PrimaryButton.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  buttonRef: PropTypes.object,
};

export default PrimaryButton;
