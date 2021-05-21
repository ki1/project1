import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';

const FooterColHeading = ({ children }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <h3 className="footer-col-heading">{children}</h3>

      <style jsx>{`
        .footer-col-heading {
          color: ${theme.colors.footerlink};
          font-weight: bold;
          font-size: 14px;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .footer-col-heading {
            display: inline;
            margin-bottom: 0px;
            margin-right: 8px;
          }

          .footer-col-heading:after {
            content: ': ';
          }
        }
      `}</style>
    </>
  );
};

export default FooterColHeading;
