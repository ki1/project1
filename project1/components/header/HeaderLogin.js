import React, { useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import HeaderIcon from './HeaderIcon';
import WowModal from '../WowModal';
import { LOGIN_MENU, LINK_LOGIN } from '../../config/links/links';
import { HeaderLogout } from './HeaderLogout';
import { redirectToURL } from '../../helpers/url';

import ThemeContext from '../../providers/ThemeProvider';

const HeaderLogin = () => {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  const userState = useSelector((state) => state.user.isAuthenticated);
  const ariaHaspopup = userState || null;
  const [showModal, setShowModal] = useState(false);
  const ariaExpanded = userState ? showModal : null;
  const ref = useRef(null);

  const onClickIcon = (show) => {
    if (!userState) {
      redirectToURL(LINK_LOGIN);
      return;
    }
    setShowModal(show);
  };

  const listItems = () => {
    const list = LOGIN_MENU[process.env.NEXT_PUBLIC_SITE];
    if (!list) return null;

    return list.map((item, index) => {
      return (
        <li
          key={`headerlogin-account__menu-item-${index}`}
          role="menuitem"
          className="account__menu-item"
          onClick={() => redirectToURL(item.href, router)}
          onKeyPress={() => redirectToURL(item.href, router)}
        >
          {item.text}
        </li>
      );
    });
  };

  return (
    <>
      <div ref={ref}></div>

      <WowModal
        title=""
        showModal={showModal}
        setShowModal={setShowModal}
        size="md"
        container={ref.current}
        ariaLabelledBy="id-subscribe"
        extraClasses="remove-header headerlogin-menu header-icon--hidden-mobile"
        backdropClassName="remove-backdrop"
      >
        <div className="menulogin-container">
          <ul className="list" role="menu">
            {listItems()}
            <HeaderLogout
              setShowModal={setShowModal}
              extraClass="account__menu-item"
            />
          </ul>
        </div>
      </WowModal>

      <HeaderIcon
        clickMethod={() => onClickIcon(true)}
        icon="login"
        isMobileHidden={true}
        isLoggedIn={userState}
        ariaHaspopup={ariaHaspopup}
        ariaExpanded={ariaExpanded}
      />
      <style jsx>{`
        .menulogin-container {
          position: relative;
        }
        ul.list {
          padding: 0;
          margin: 0;
          list-style: none;
          width: 100%;
        }
      `}</style>
      <style jsx global>{`
        li.account__menu-item {
          padding: 4px 5px 4px 10px;
          display: block;
          cursor: pointer;
          text-align: -webkit-match-parent;
        }
        li.account__menu-item:hover {
          background: ${theme.colors.primary};
          color: white;
        }
      `}</style>
    </>
  );
};

export default HeaderLogin;
