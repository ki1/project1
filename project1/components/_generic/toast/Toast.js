import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ children, title, status, extraClass, position, remove }) => {
  const removeRef = useRef();
  removeRef.current = remove;

  useEffect(() => {
    const duration = 3000;
    const id = setTimeout(() => removeRef.current(), duration);

    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={`toast ${position} ${status} ${extraClass}`}
      role="alert"
      aira-live="polite"
      onClick={remove}
    >
      {title && <p className="toast__title">{title}</p>}
      <div className="toast__image"></div>
      <p className="toast__message">{children}</p>
    </div>
  );
};

Toast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'toast-error',
    'toast-info',
    'toast-success',
    'toast-warning',
  ]),
  position: PropTypes.oneOf([
    'top-right',
    'top-left',
    'bottom-right',
    'bottom-left',
  ]),
  extraClass: PropTypes.string,
  remove: PropTypes.func,
};

Toast.defaultProps = {
  title: '',
  message: '',
  status: 'toast-info',
  extraClass: '',
  position: 'top-right',
};

export default Toast;
