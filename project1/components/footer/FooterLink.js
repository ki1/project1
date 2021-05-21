import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const FooterLink = ({ href, text }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <li className="footer__li">
        <a className="footer__link" href={href}>
          {text}
        </a>
      </li>
      <style jsx>{`
        .footer__link {
          color: ${theme.colors.footerlink};
          display: inline-block;
          text-decoration: none;
        }
        .footer__link:hover {
          text-decoration: underline;
          color: ${theme.colors.primary};
        }

        @media (max-width: ${theme.breakpoints.mdDown}) {
          .footer__link {
            line-height: 34px;
          }
          .footer__li:last-child .footer__link {
            min-width: 48px;
          }
          .footer__li {
            display: inline-block;
            word-wrap: none;
          }
          .footer__link:after {
            content: ', ';
            display: inline-block;
            white-space: pre;
            color: ${theme.colors.footerlink};
            text-decoration: none;
          }
          .footer__li:last-child .footer__link:after {
            content: '.';
          }
        }
      `}</style>
    </>
  );
};

export default FooterLink;

FooterLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
