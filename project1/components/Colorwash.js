import React, { useContext } from 'react';
import ThemeContext from '../providers/ThemeProvider';

const Colorwash = () => {
  const theme = useContext(ThemeContext);
  if (!theme.images.bgcolorwash) return null;
  return (
    <div className="colourwash">
      <style jsx>{`
        .colourwash {
          z-index: -1;
          width: 100%;
          height: 100%;
          position: fixed;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          top: 0px;
          left: 0px;
          background-image: url(${theme.images.bgcolorwash});
        }
      `}</style>
    </div>
  );
};

export default Colorwash;
