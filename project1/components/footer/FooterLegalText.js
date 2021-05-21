import React, { useContext } from 'react';
import {
  ALL_RIGHTS_RESERVED,
  COMPANY_LEGAL_NAME,
  COMPANY_TRADING_NAME,
  PAYPAL_CREDIT_LEGAL,
  PRICES_SUBJECT_TO_CHANGE,
  REPLACE_COMPANY_TRADING_NAME,
  COUNTDOWN_LEGAL,
} from '../../config/text/text';
import { FOOTER_LEGAL_LINKS } from '../../config/links/links';
import ThemeContext from '../../providers/ThemeProvider';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const FooterLegalText = ({ site, isSecurePage, isCheckout }) => {
  const theme = useContext(ThemeContext);
  const year = new Date().getFullYear();
  const companyLegalName = COMPANY_LEGAL_NAME[site];
  const companyLegalLinks = FOOTER_LEGAL_LINKS[site];
  const companyTradingName = COMPANY_TRADING_NAME[site];
  const paypalCreditLegal = PAYPAL_CREDIT_LEGAL.replace(
    REPLACE_COMPANY_TRADING_NAME,
    companyTradingName
  );

  return (
    <>
      <div
        className={classNames('legal-text__container', {
          'legal-text__container--secure': isSecurePage,
        })}
      >
        <p className="legal-text">
          &copy; {year} {companyLegalName}. {ALL_RIGHTS_RESERVED}.{' '}
          {companyLegalLinks.map((link, i) => {
            return (
              <a
                key={i}
                className="legal-text__link"
                href={link.href}
                aria-label={link.text}
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.text}
              </a>
            );
          })}
        </p>
        {site !== 'livingsocialie' && (
          <p className="legal-text legal-text--paypal" data-testid="paypal">
            {paypalCreditLegal}
          </p>
        )}
        <p className="legal-text">{COUNTDOWN_LEGAL}</p>
        {isCheckout && (
          <p className="legal-text" data-testid="prices">
            {PRICES_SUBJECT_TO_CHANGE}
          </p>
        )}
      </div>
      <style jsx>{`
        .legal-text {
          font-size: 12px;
          margin-bottom: 5px;
          color: ${theme.colors.footerlegaltext};
        }
        .legal-text__container--secure .legal-text {
          font-size: inherit;
        }
        .legal-text:last-child {
          margin-bottom: 5px;
        }
        .legal-text__link {
          display: inline-block;
          font-weight: bold;
          text-decoration: none;
          color: ${theme.colors.footerlegaltext};
        }
        .legal-text__link:hover {
          text-decoration: underline;
          color: ${theme.colors.primary};
        }
        .legal-text__link:after {
          content: ', ';
          display: inline-block;
          white-space: pre;
          color: ${theme.colors.footerlegaltext};
          text-decoration: none;
        }
        .legal-text__link:last-child:after {
          content: '.';
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .legal-text {
            font-size: inherit;
          }
          .legal-text--paypal {
            display: none;
          }
          .legal-text__container--secure .legal-text--paypal {
            display: block;
          }
          .legal-text__link {
            display: none;
          }
          .legal-text__container--secure .legal-text__link {
            display: inline-block;
          }
        }
      `}</style>
    </>
  );
};

FooterLegalText.propTypes = {
  site: PropTypes.string.isRequired,
  isSecurePage: PropTypes.bool,
  isCheckout: PropTypes.bool,
};

export default FooterLegalText;
