import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import classnames from 'classnames';

const FooterCol = ({ children, className, noRender }) => {
  const theme = useContext(ThemeContext);

  if (noRender) {
    return null;
  }

  return (
    <>
      <div className={classnames('footer__col', className)}>{children}</div>
      <style jsx>{`
        .footer__col {
          flex-basis: 0;
          flex-grow: 1;
          border-right: 1px solid ${theme.colors.footerlink};
          padding: 0 20px;
        }
        .footer__col:first-child {
          padding-left: 0;
        }
        .footer__col:last-child {
          padding-right: 0;
        }
        .footer__col:last-child {
          border-right: none;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .footer__col {
            border-right: none;
            padding: 0;
            margin-bottom: 12px;
          }
          .footer__col:last-child {
            margin-bottom: 0;
          }
          .footer__col--hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default FooterCol;
