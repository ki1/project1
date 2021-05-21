import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MediaButton = ({ title, ico, img, type, isDisabled, mediaClick }) => {
  const getImage = () => {
    return (
      <>
        <img src={img} className="media-button__image" alt="" />
        <style jsx>{`
          .media-button__image {
            width: 36px;
            height: 36px;
          }
        `}</style>
      </>
    );
  };

  const getIcon = () => {
    return (
      <>
        <FontAwesomeIcon
          className={`media-button__icon ico-${type}`}
          style={{ height: 28, width: 28 }}
          icon={ico}
        />
        <style jsx global>{`
          .media-button__icon {
            color: #fff;
            margin-left: 3px;
          }
        `}</style>
      </>
    );
  };

  const mediaAction = (e) => {
    e.preventDefault();
    mediaClick && mediaClick();
  };

  const disabledClass = isDisabled ? 'disabled' : '';
  return (
    <>
      <a
        id={`${type}Button`}
        href="#"
        onClick={mediaAction}
        className={`d-inline-flex align-items-center media-button ${type} ${disabledClass}`}
      >
        {img && getImage()}
        {ico && getIcon()}
        {title && <span className="media-button__text">{title}</span>}
      </a>

      <style jsx>{`
        .google {
          background-color: #4285f4;
        }

        .facebook {
          background-color: #0052a3;
        }

        .media-button {
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
          cursor: pointer;
          min-height: 36px;
          text-decoration: none;
        }

        .media-button.disabled {
          cursor: default;
          opacity: 0.4;
        }

        .media-button:hover {
          text-decoration: none;
        }

        .media-button__text {
          color: #fff;
          font-size: 13px;
          padding: 0 13px;
        }

        .facebook .media-button__text {
          padding: 0 7px;
        }
      `}</style>
    </>
  );
};

MediaButton.propTypes = {
  title: PropTypes.string,
  mediaClick: PropTypes.func,
  ico: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  img: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

MediaButton.defaultProps = {
  title: '',
  ico: '',
  img: '',
  type: '',
  isDisabled: false,
};

export default MediaButton;
