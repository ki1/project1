import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import { LINK_HOME } from '../../config/links/links';
import PropTypes from 'prop-types';

const HeaderLogo = ({ reversed, width, height, align, both }) => {
  const theme = useContext(ThemeContext);
  const logoSrc = !reversed
    ? theme.images.headerlogo
    : theme.images.headerLogoReversed;

  let heightAux = height;
  let widthAux = 'auto';
  if (height && height === 'auto') {
    heightAux = '100%';
    widthAux = '100%';
  }
  return (
    <>
      <div className={`logo-container ${both ? 'both' : ''}`}>
        <a className="logo-link" href={LINK_HOME}>
          {!both && <img src={`${logoSrc}`} className="logo" alt="Logo" />}
          {both && (
            <>
              <img
                src={`${theme.images.headerlogo}`}
                className="logo headerlogo"
                alt="Logo"
              />
              <img
                src={`${theme.images.headerLogoReversed}`}
                className="logo headerlogoreversed"
                alt="Logo"
              />
            </>
          )}
        </a>
      </div>
      <style jsx>{`
        .logo-container {
          display: flex;
          min-height: 41px;
          align-items: center;
          justify-content: ${align || 'center'};
          max-height: ${height || '26px'};
          max-width: ${width || '80px'};
        }
        .logo-link {
          // display: flex;
        }
        .logo {
          display: flex;
          height: ${heightAux || '26px'};
          width: ${widthAux};
          align-self: flex-start;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .logo-container {
            display: flex;
            min-height: 75px;
            max-height: ${theme.images.headerlogomdwidth};
            max-width: ${theme.images.headerlogomdwidth};
          }
          .logo {
            display: block;
            height: auto;
            width: ${theme.images.headerlogomdwidth};
          }
        }
        @media (min-width: ${theme.breakpoints.lgUp}) {
          .logo-container {
            max-width: ${theme.images.headerlogolgwidth};
            max-height: ${theme.images.headerlogolgwidth};
          }
          .logo {
            width: ${theme.images.headerlogolgwidth};
            height: auto;
          }
        }
        .both .headerlogo {
          display: none;
        }
        .both .headerlogoreversed {
          display: block;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          //768
          .both .headerlogo {
            display: block;
          }
          .both .headerlogoreversed {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

HeaderLogo.propTypes = {
  both: PropTypes.bool,
};

HeaderLogo.defaultProps = {
  both: false,
};

export default HeaderLogo;
