import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ThemeContext from '../../../providers/ThemeProvider';

const Input = ({
  onChangeFunction,
  onBlurFunction,
  onFocusFunction,
  name,
  type,
  icon,
  placeholder,
  valid,
  error,
  normal,
  errorText,
  required,
  inputValue,
  extraClasses,
  accessable,
  disable,
  bottomLined,
  hint,
  min,
  max,
  maxLength,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const componentClass = classNames(`input-container ${extraClasses}`, {
    'underlined-input': bottomLined,
    valid: valid,
    error: error,
    normal: normal,
  });
  const showError = error && errorText;

  return (
    <>
      <div className={componentClass}>
        <div className="form-group">
          <input
            {...props}
            type={type}
            className={`form-control field__${name}`}
            placeholder={placeholder}
            name={name}
            onChange={(e) => onChangeFunction(e)}
            onBlur={(e) => onBlurFunction(e)}
            onFocus={(e) => onFocusFunction(e)}
            required={required}
            value={inputValue}
            {...(disable && { disabled: 'disabled' })}
            {...(accessable && { 'aria-label': `${placeholder}` })}
            min={min}
            max={max}
            maxLength={maxLength}
          />
          {icon && (
            <span className="input-container__icon">
              <FontAwesomeIcon style={{ height: 16, width: 16 }} icon={icon} />
            </span>
          )}
          {hint && <span className="input-container__hint">{hint}</span>}
        </div>
        {!!showError && (
          <div className="bg-danger">
            <span>{errorText}</span>
          </div>
        )}
      </div>
      <style jsx>{`
        .input-container__icon {
          color: ${theme.colors.inputiconcolor};
        }
        .form-control:focus {
          border-color: ${theme.colors.inputfocuscolor};
        }
        .underlined-input .form-control:focus {
          border-color: ${theme.colors.inputlogincolor};
        }
        .underlined-input.valid .form-control {
          border-bottom-color: ${theme.colors.inputlogincolor};
        }
        .underlined-input.valid .input-container__icon {
          color: ${theme.colors.inputvalidcolor};
        }
        .error .form-control,
        .error .form-control:focus {
          border-color: ${theme.colors.inputinvalidcolor};
        }
        .error .input-container__icon {
          color: ${theme.colors.inputinvalidcolor};
        }
        .bg-danger {
          background: ${theme.colors.inputinvalidcolor};
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .mobile-highlight-border .form-control,
          .mobile-highlight-border.underlined-input .form-control:focus,
          .mobile-highlight-border.underlined-input.valid .form-control {
            border-color: ${theme.colors.primary};
          }
        }
      `}</style>
    </>
  );
};

Input.propTypes = {
  onChangeFunction: PropTypes.func.isRequired,
  onBlurFunction: PropTypes.func,
  onFocusFunction: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  extraClasses: PropTypes.string,
  required: PropTypes.bool,
  inputValue: PropTypes.string.isRequired,
  accessable: PropTypes.bool,
  disable: PropTypes.bool,
  bottomLined: PropTypes.bool,
  hint: PropTypes.string,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Input.defaultProps = {
  onChangeFunction: () => {},
  onBlurFunction: () => {},
  onFocusFunction: () => {},
  name: '',
  type: '',
  icon: '',
  placeholder: '',
  errorText: '',
  valid: false,
  error: false,
  normal: false,
  required: true,
  extraClasses: '',
  value: '',
  inputValue: '',
  accessable: true,
  disable: false,
  bottomLined: false,
  hint: '',
};

export default Input;
