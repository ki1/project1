import React, { useContext } from 'react';
import ThemeContext from '../../../providers/ThemeProvider';

const DealMobileScrim = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className="deal__mobile-scrim" />
      <style jsx>{`
        .deal__mobile-scrim {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(125, 185, 232, 0.001) 0,
            rgba(0, 0, 0, 0) 20%,
            rgba(0, 0, 0, 0.7)
          );
          display: none;
          pointer-events: none;
        }
        @media (max-width: ${theme.breakpoints.smDown}) {
          .deal__mobile-scrim {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default DealMobileScrim;
