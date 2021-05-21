import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ThemeContext from '../../../providers/ThemeProvider';

/**
 * CTA Button with variants
 *   primaryAction = true, button background is buttonprimary (blue)
 *   primaryAction = false, button background is transparent
 *   className = subscribe, button background is subscribebutton (pink), round corners only on the right
 *   className = payment-button, button background is #eb008c
 *   className = with-header-background, button background is a gradient (blue)
 *
 * Flags
 *   primaryAction = true | false  => with background | transparent
 *   gradientButton = true | false => with Gradient background | inherit
 *
 */
const CTAButton = ({
  type,
  children,
  onClick,
  style,
  className,
  disabled,
  ariaLabel,
  primaryAction,
  secondaryButton,
  tertiaryButton,
  gradientButton,
  formId,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <button
        type={type || 'button'}
        style={style}
        onClick={onClick}
        className={classNames(
          'general-button',
          {
            'primary-button': primaryAction,
            'secondary-button': secondaryButton,
            'tertiary-button': tertiaryButton,
            'gradient-button': gradientButton,
          },
          className
        )}
        disabled={disabled}
        aria-label={ariaLabel}
        form={formId}
      >
        {children}
      </button>

      <style jsx>{`
        .general-button {
          border-radius: 6px;
          display: inline-block;
          font-weight: 700;
          margin-bottom: 4px;
          min-height: 42px;
          padding: 4px 16px;
          text-transform: ${theme.text.cta.button};
          white-space: nowrap;
        }
        @media (max-width: ${theme.breakpoints.xlDown}) {
          .general-button {
            padding: 4px 8px;
          }
        }
        .general-button[disabled] {
          opacity: 0.4;
          pointer-events: none;
        }
        .general-button.full-width {
          width: 100%;
        }
        .primary-button {
          background-color: ${theme.colors.buttonprimary};
          color: ${theme.colors.buttontext};
          border: none;
          border-bottom: 3px solid ${theme.colors.buttonprimaryhover};
        }
        .primary-button:hover {
          background-color: ${theme.colors.buttonprimaryhover};
          border-bottom: 3px solid #1e7192;
        }
        .primary-button:active {
          border-bottom: 2px solid #1e7192;
        }
        .secondary-button {
          background-color: ${theme.colors.buttonsecondary};
          color: ${theme.colors.buttontext};
          border: none;
          border-bottom: 3px solid ${theme.colors.buttonsecondaryhover};
        }
        .secondary-button:hover {
          background-color: ${theme.colors.buttonsecondaryhover};
          border-bottom: 3px solid #520031;
        }
        .secondary-button:active {
          border-bottom: 2px solid #520031;
        }

        .tertiary-button {
          background-color: transparent;
          color: ${theme.colors.buttontertiary};
          border: 1px solid ${theme.colors.buttontertiary};
        }
        .tertiary-button:hover,
        .tertiary-button:active {
          background-color: ${theme.colors.buttontertiaryhover};
          color: ${theme.colors.buttontext};
          border: 1px solid ${theme.colors.buttontertiary};
        }

        .black-button {
          background: #1a1a1a;
          border: none;
          border-bottom: 3px solid #000000;
        }
        .black-button:hover,
        .black-button:active {
          background: #1a1a1a;
          border-bottom: 3px solid #000000;
        }

        .gold-button {
          background: #eec954;
          border: none;
          border-bottom: 3px solid #c89c14;
          color: #5d4909;
          text-shadow: 1px 1px 1px #ffffff;
        }
        .gold-button:hover,
        .gold-button:active {
          border: none;
          background: #e9ba26;
          color: #5d4909;
          border-bottom: 3px solid #997810;
        }

        .paypal-button {
          background: #ffc439;
          border: none;
          border-bottom: 3px solid #c89c14;
          color: #5d4909;
          font-size: 15px;
          text-shadow: 1px 1px 1px #ffffff;
          text-transform: unset;
        }
        .paypal-button:hover,
        .paypal-button:active {
          border: none;
          background: #f2b72c;
          color: #5d4909;
          border-bottom: 3px solid #997810;
        }

        .paypal-credit-button {
          background: #003087;
          border: none;
          border-bottom: 3px solid #001e54;
          color: #ffffff;
          font-size: 15px;
          text-transform: unset;
        }
        .paypal-credit-button :hover,
        .paypal-credit-button:active {
          border: none;
          background: #0042ba;
          color: #ffffff;
          border-bottom: 3px solid #0054ed;
        }

        .subscribe.primary-button {
          background: ${theme.colors.subscribebutton};
          font-size: 14px;
          border-radius: 0px 6px 6px 0px;
          border: 0;
          color: #fff;
          cursor: pointer;
          height: 40px;
          margin: 0;
          padding: 0 8px;
          right: 0;
          text-transform: uppercase;
          font-weight: 100;
          min-width: 80px;
        }

        .payment-button {
          background-color: ${theme.colors.checkoutmodulebg};
          border: 2px solid black;
          border-radius: 36px;
          color: ${theme.colors.bodytext};
          margin: 15px;
          width: 32%;
        }

        @media (max-width: ${theme.breakpoints.xlDown}) {
          .payment-button {
            margin: 15px 5px;
          }
        }

        .payment-button--isActive {
          background-color: ${theme.colors.paymentbuttonbg};
          border: 2px solid ${theme.colors.inputfocuscolor};
        }

        @media (max-width: 980px) {
          .subscribe.primary-button {
            min-width: 60px;
          }
        }

        .wallet.primary-button {
          margin-top: 25px;
          background-color: #eb008c;
          border-bottom: 3px solid #b8006e;
        }
        .wallet.primary-button:hover {
          background-color: #b8006e;
          border-bottom: 3px solid #520031;
        }

        .with-header-background.primary-button {
          background: linear-gradient(
            180deg,
            ${theme.colors.linealgradient1} 0,
            ${theme.colors.linealgradient2}
          );
          color: #fff;
          width: fit-content;
        }
        .with-header-background.primary-button {
          font-size: 1.8rem;
        }

        // Gradient Button styles
        .gradient-button:hover {
          border-bottom: none;
        }
        .gradient-button {
          border-bottom: none;
          text-transform: ${theme.text.error404};
          font-size: 22px;
          font-weight: 100;
          background: linear-gradient(
            180deg,
            ${theme.colors.linealgradient1} 0,
            ${theme.colors.linealgradient2}
          );
          color: #fff;
          width: fit-content;
        }
      `}</style>
    </>
  );
};

CTAButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  primaryAction: PropTypes.bool,
  secondaryButton: PropTypes.bool,
  tertiaryButton: PropTypes.bool,
  gradientButton: PropTypes.bool,
  formId: PropTypes.string,
};

CTAButton.defaultProps = {
  primaryAction: true,
  gradientButton: false,
};

export default CTAButton;
