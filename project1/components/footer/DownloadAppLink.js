import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const DownloadAppLink = ({ src, href, alt, ariaLabel, inline }) => {
  return (
    <>
      <a
        className={classNames('download-link', {
          'download-link--inline': inline,
        })}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
      >
        <img className="download-link__img" alt={alt} src={src} />
      </a>
      <style jsx>{`
        .download-link {
          position: relative;
          display: block;
          margin-bottom: 5px;
        }
        .download-link--inline {
          display: inline-block;
          margin-bottom: 0;
        }
        .download-link--inline:first-child {
          width: calc(47% - 3px);
        }
        .download-link--inline:last-child {
          width: calc(53% - 3px);
        }
        .download-link__img {
          height: 100%;
          width: 100%;
          max-width: 160px;
        }
      `}</style>
    </>
  );
};

DownloadAppLink.propTypes = {
  src: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default DownloadAppLink;
