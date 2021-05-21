import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';

const FooterContainer = ({ children }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <footer className="footer" id="footer">
        <div className="container">{children}</div>
      </footer>
      <style jsx>{`
        .footer {
          background-color: ${theme.colors.footerbackground};
          padding: 20px 0;
        }
      `}</style>
    </>
  );
};

export default FooterContainer;
