import React, { useState, useEffect } from 'react';

const ThemeSwitcher = ({ changeTheme }) => {
  const [bottom, setBottom] = useState(0);
  let bottomPos = bottom + 'px';

  useEffect(() => {
    // Update the component css position
    bottomPos = bottom + 'px';
  });

  return (
    <div className="theme-switch">
      <b className="switch-link">Theme:</b>&nbsp;
      <a
        role="link"
        tabIndex="0"
        onClick={() => changeTheme('wowcher')}
        onKeyDown={() => changeTheme('wowcher')}
        className="switch-link"
      >
        (Wowcher)
      </a>
      &nbsp;
      <a
        role="link"
        tabIndex="0"
        onClick={() => changeTheme('living-social')}
        onKeyDown={() => changeTheme('living-social')}
        className="switch-link"
      >
        (Livingsocial)
      </a>
      &nbsp;
      <a
        role="link"
        tabIndex="0"
        onClick={() => changeTheme('vip')}
        onKeyDown={() => changeTheme('vip')}
        className="switch-link"
      >
        (Vip)
      </a>
      &nbsp;&nbsp;
      <a
        role="link"
        tabIndex="0"
        onClick={() => setBottom(bottom + 50)}
        onKeyDown={() => setBottom(bottom + 50)}
        className="switch-link"
      >
        Up&#8679;
      </a>
      &nbsp;
      <a
        role="link"
        tabIndex="0"
        onClick={() => setBottom(bottom - 50)}
        onKeyDown={() => setBottom(bottom - 50)}
        className="switch-link"
      >
        Down&#8681;
      </a>
      &nbsp;
      <style jsx>{`
        .theme-switch {
          background-color: #ffffff;
          border: 1px #999 solid;
          bottom: ${bottomPos};
          left: 0px;
          padding: 5px;
          position: fixed;
        }
        .switch-link {
          color: #666666;
        }
      `}</style>
    </div>
  );
};

export default ThemeSwitcher;
