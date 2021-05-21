// expander
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ThemeContext from '../../../providers/ThemeProvider';
import {
  EXPANDER_MORE,
  EXPANDER_LESS,
  EXPANDER_MORE_MOBILE,
  EXPANDER_LESS_MOBILE,
} from '../../../config/text/text';

const TYPE_ABSOLUTE = 'TYPE_ABSOLUTE';
const TYPE_RELATIVE = 'TYPE_RELATIVE';
export { TYPE_ABSOLUTE };
export { TYPE_RELATIVE };

const useClientEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect;

const Expander = ({
  children,
  type,
  bgcolor,
  initHeight,
  zindex,
  breakpoint,
}) => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('');

  const cssBgColor = bgcolor ? bgcolor : `${theme.colors.navbackground}`;
  const height = initHeight ? initHeight : 0;
  const cssZindex = zindex ? zindex : 10;
  const typeClass = type === TYPE_ABSOLUTE ? 'absolute' : 'relative';
  const textClass = isOpen
    ? `expander-open ${typeClass}`
    : `expander-closed  ${typeClass}`;

  const [hasMore, setHasMore] = useState(true);
  const content = useRef();

  useEffect(() => {
    let MORE = EXPANDER_MORE_MOBILE;
    let LESS = EXPANDER_LESS_MOBILE;
    if (breakpoint !== 'sm') {
      MORE = EXPANDER_MORE;
      LESS = EXPANDER_LESS;
    }
    setButtonText(isOpen ? LESS : MORE);
  }, [breakpoint, isOpen]);

  useClientEffect(() => {
    if (content.current) {
      setHasMore(height < content.current.scrollHeight);
    }
  }, [height]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="expander-container">
        <div className={textClass} ref={content}>
          {children}
          <button className="expander-button" onClick={toggleOpen}>
            {buttonText}
          </button>
        </div>
        {type && type === TYPE_ABSOLUTE && <div className="spacer"></div>}
      </div>
      <style jsx>{`
        .expander-container {
          position: relative;
          width: 100%;
          padding-bottom: 15px;
          background-color: ${cssBgColor};
        }
        .spacer {
          height: ${height}px;
          position: relative;
        }
        .expander-button {
          display: ${hasMore ? 'block' : 'none'};
          bottom: 0;
          border: 0;
          color: ${theme.colors.primaryonwhite};
          font-size: 12px;
          line-height: 12px;
          padding: 2px 4px 1px 10px;
          position: absolute;
          right: 15px;
          text-align: left;
          background-color: ${cssBgColor};
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .expander-container {
            padding-bottom: 0;
          }
          .expander-button {
            padding: 8px 10px 8px 10px;
            font-size: 14px;
            right: 0;
            width: 100%;
          }
        }
        @media (min-width: ${theme.breakpoints.lgUp}) {
          .expander-button {
            padding: 8px 16px 8px 16px;
          }
        }
        @media (min-width: ${theme.breakpoints.xlUp}) {
          .expander-container {
            margin-bottom: 20px;
          }
        }
        .expander-open {
          background-color: ${cssBgColor};
          height: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          position: relative;
          width: 100%;
          z-index: ${cssZindex};
        }
        .expander-closed {
          background-color: ${cssBgColor};
          height: ${height}px;
          overflow-y: hidden;
          padding-bottom: 25px;
          position: relative;
          width: 100%;
          z-index: ${cssZindex};
        }
        .absolute {
          position: absolute;
        }
        .relative {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Expander;
