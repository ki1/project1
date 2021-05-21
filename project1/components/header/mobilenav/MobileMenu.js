import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AccordionContext from 'react-bootstrap/AccordionContext';
import MobileMenuSectionHead from './MobileMenuSectionHead';
import SubscribeModal from '../../generic/forms/subscribeModal';
import { HeaderLogout } from '../HeaderLogout';
import {
  MOBILE_MENU_NAV_HEAD,
  MOBILE_MENU_ACCOUNT_HEAD,
  MOBILE_MENU_MORE_HEAD,
  MOBILE_MENU_SUBSCRIBE_HEAD,
  MOBILE_MENU_DOWNLOAD,
} from '../../../config/text/text';
import {
  faShoppingCart,
  faEnvelope,
  faUser,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import {
  useNavigationSelection,
  findLinkMatchingPath,
} from '../../../helpers/url';
import ThemeContext from '../../../providers/ThemeProvider';
import MobileNavigationLink from './MobileNavigationLink';
import {
  MOBILE_MENU_MORE_LINKS,
  LOGIN_MENU,
  REGISTER_MENU,
  LINK_APPLE_APP_STORE,
  LINK_GOOGLE_PLAY_STORE,
} from '../../../config/links/links';
import PropTypes from 'prop-types';

const ContextAwareToggle = ({ eventKey, callback, faIcon, buttonText }) => {
  const currentEventKey = useContext(AccordionContext);
  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <>
      <button
        type="button"
        onClick={decoratedOnClick}
        className="head-section__button"
      >
        <MobileMenuSectionHead
          buttonText={buttonText}
          faIcon={faIcon}
          isCurrentEventKey={isCurrentEventKey}
          isExpander={true}
        />
      </button>
      <style jsx>{`
        .head-section__button {
          background-color: white;
          border: 0;
          text-align: left;
          padding: 0;
          width: 100%;
        }
      `}</style>
    </>
  );
};

const MobileMenu = ({ navigation, path }) => {
  const theme = useContext(ThemeContext);
  const navSelection =
    navigation && path ? useNavigationSelection(navigation, path) : '';

  const moreLinks = MOBILE_MENU_MORE_LINKS[process.env.NEXT_PUBLIC_SITE];
  const moreSelection =
    moreLinks && path ? findLinkMatchingPath(moreLinks, path) : '';
  const moreSelectionHref = moreSelection ? moreSelection.href : null;
  const defaultAccordionKey = moreSelection ? 'MORE_KEY' : 'NAV_KEY';

  const userState = useSelector((state) => state.user.isAuthenticated);
  const loggedInLinks = LOGIN_MENU[process.env.NEXT_PUBLIC_SITE];
  const loggedOutLinks = REGISTER_MENU[process.env.NEXT_PUBLIC_SITE];
  const userMenu = userState ? loggedInLinks : loggedOutLinks;

  const appleLink = LINK_APPLE_APP_STORE[process.env.NEXT_PUBLIC_SITE];
  const androidLink = LINK_GOOGLE_PLAY_STORE[process.env.NEXT_PUBLIC_SITE];
  const isIOS = navigator.userAgent.match(/(ipad|iphone|ipod)/i);
  const isAndroid = navigator.userAgent.match(/(android|htc|samsung)/i);
  let downloadLink = null;

  const [showSubModal, setShowSubModal] = useState(false);

  const openSubMenu = (val) => {
    setShowSubModal(val);
  };

  if (isIOS) downloadLink = appleLink;
  if (isAndroid) downloadLink = androidLink;

  return (
    <>
      <div className="mobile-menu">
        <Accordion defaultActiveKey={defaultAccordionKey}>
          {navigation && (
            <ContextAwareToggle
              eventKey="NAV_KEY"
              buttonText={MOBILE_MENU_NAV_HEAD}
              faIcon={faShoppingCart}
            />
          )}
          <Accordion.Collapse eventKey="NAV_KEY">
            <ul className="mobile-menu__list">
              {navigation &&
                navigation.map((item) => {
                  return (
                    <MobileNavigationLink
                      key={item.id}
                      href={item.url}
                      selected={navSelection === item.id}
                      linkText={item.linkText}
                    />
                  );
                })}
            </ul>
          </Accordion.Collapse>
          <button className="removeButton" onClick={() => openSubMenu(true)}>
            <MobileMenuSectionHead
              buttonText={MOBILE_MENU_SUBSCRIBE_HEAD}
              faIcon={faEnvelope}
              isCurrentEventKey={false}
              isExpander={false}
            />
          </button>

          <ContextAwareToggle
            eventKey="USER_KEY"
            buttonText={MOBILE_MENU_ACCOUNT_HEAD}
            faIcon={faUser}
          />
          <Accordion.Collapse eventKey="USER_KEY">
            <div>
              <ul className="mobile-menu__list">
                {userMenu.map((item) => {
                  return (
                    <MobileNavigationLink
                      key={item.href}
                      href={item.href}
                      linkText={item.text}
                    />
                  );
                })}
                {userState && <HeaderLogout extraClass={'navigation-link'} />}
              </ul>
            </div>
          </Accordion.Collapse>
          <ContextAwareToggle
            eventKey="MORE_KEY"
            buttonText={MOBILE_MENU_MORE_HEAD}
            faIcon={faCog}
          />
          <Accordion.Collapse eventKey="MORE_KEY">
            <ul className="mobile-menu__list">
              {moreLinks.map((link) => {
                return (
                  <MobileNavigationLink
                    key={link.href}
                    href={link.href}
                    selected={moreSelectionHref === link.href}
                    linkText={link.text}
                  />
                );
              })}
              {downloadLink && (
                <MobileNavigationLink
                  href={downloadLink}
                  linkText={MOBILE_MENU_DOWNLOAD}
                  target="_blank"
                />
              )}
            </ul>
          </Accordion.Collapse>
        </Accordion>
      </div>
      <SubscribeModal showModal={showSubModal} setShowModal={setShowSubModal} />
      <style jsx>{`
        .mobile-menu {
          background-color: ${theme.colors.mobilemenubg};
        }
        .mobile-menu__list {
          border-bottom: 1px solid ${theme.colors.primary};
          margin-bottom: 0;
          max-height: calc(100vh - 286px);
          overflow-y: scroll;
          padding: 0;
        }

        .removeButton {
          border: 0;
          width: 100%;
          text-align: left;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default MobileMenu;

MobileMenu.propTypes = {
  navigation: PropTypes.array,
  path: PropTypes.string,
};
