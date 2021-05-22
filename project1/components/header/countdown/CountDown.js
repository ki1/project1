import React, { useContext, useState, useEffect } from 'react';
import { getCountDown } from '../../../helpers/timer';
import ThemeContext from '../../../providers/ThemeProvider';
import {
  COUNTDOWN_TEXT,
  INITIAL_COUNTDOWN_TIME,
} from '../../../config/text/text';

const CountDown = () => {
  const theme = useContext(ThemeContext);
  const [timeToPrint, setTimeToPrint] = useState(INITIAL_COUNTDOWN_TIME);

  useEffect(() => {
    setTimeToPrint(getCountDown());
    const interval = setInterval(() => {
      setTimeToPrint(getCountDown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <div
        id="pricesRefreshTimer"
        data-testid="countdownBanner"
        className="countdownBanner"
      >
        <span className="countdownText">
          {COUNTDOWN_TEXT[process.env.NEXT_PUBLIC_SITE]}*:{' '}
        </span>
        <span
          style={{ opacity: timeToPrint === INITIAL_COUNTDOWN_TIME ? 0 : 1 }}
          className="countdownDigits"
        >
          {timeToPrint}
        </span>
      </div>
      <style jsx>{`
        .countdown {
          margin-bottom: 15px;
          position: relative;
          background-color: ${theme.colors.navbackground};
          border-bottom: 2px solid #d2d2d2;
          display: block;
          text-align: center;
          position: relative;
          width: 100%;
          font-weight: 600;
          padding: 5px;
          color: ${theme.colors.primary};
          -moz-box-shadow: inset 0 6px 6px -6px rgba(68, 68, 68, 0.6);
          -webkit-box-shadow: inset 0 6px 6px -6px rgba(68, 68, 68, 0.6);
          box-shadow: inset 0 6px 6px -6px rgba(68, 68, 68, 0.6);
        }
        .countdownDigits {
          color: ${theme.colors.countdownnumbers};
        }

        @media only screen and (min-width: ${theme.breakpoints.mdUp}) {
          .countdownBanner {
            font-size: 1.4em;
          }
        }
      `}</style>
    </div>
  );
};

export default CountDown;
