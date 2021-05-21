import React, { useContext } from 'react';
import { CAREERS_IMG } from '../../config/constants/images';
import { LINK_CAREERS } from '../../config/links/links';
import { VIEW_CAREERS, WORK_WITH_US } from '../../config/text/text';
import ThemeContext from '../../providers/ThemeProvider';

/**
 * Careers link image for the footer.
 * This will not be shown on some sites. Visibility is controlled by the Footer component.
 */
const CareersLinkImage = () => {
  const theme = useContext(ThemeContext);
  return (
    <>
      <a
        className="image-link"
        href={LINK_CAREERS}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={VIEW_CAREERS}
      >
        <span className="image-link__label">{WORK_WITH_US}</span>
        <span className="image-link__button">{VIEW_CAREERS}</span>
        <img alt="" className="image-link__img" src={CAREERS_IMG} />
      </a>
      <style jsx>{`
        .image-link {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .image-link__label {
          position: absolute;
          top: 15px;
          right: -8px;
          background: #fff;
          color: ${theme.colors.imagelink};
          font-weight: 700;
          font-style: italic;
          padding: 3px;
        }
        .image-link__button {
          position: absolute;
          left: 10px;
          bottom: 10px;
          width: calc(100% - 20px);
          padding: 4px;
          text-align: center;
          border-radius: 4px;
          margin: 0 auto;
          background: ${theme.colors.imagelink};
          color: #fff;
          text-transform: uppercase;
        }
        .image-link__img {
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default CareersLinkImage;
