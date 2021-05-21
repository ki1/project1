import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import useToast from '../_generic/toast/UseToast';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../config/text/text';
import { Logout } from '../../helpers/logout';

export const HeaderLogout = ({ setShowModal, extraClass }) => {
  const theme = useContext(ThemeContext);
  const toast = useToast();
  const dispatch = useDispatch();

  return (
    <>
      <li
        role="menuitem"
        className={`logout-link ${extraClass}`}
        onClick={(e) => Logout(e, toast, dispatch, setShowModal)}
        onKeyPress={(e) => Logout(e, toast, dispatch, setShowModal)}
      >
        {LOGOUT}
      </li>
      <style jsx>
        {`
          .logout-link {
            display: block;
            white-space: nowrap;
          }
          .navigation-link {
            color: ${theme.colors.navlink};
            padding: 5px 12px 5px 42px;
            text-transform: ${theme.text.navigation.transform};
            font-size: ${theme.text.navigation.size}px;
          }
          .navigation-link:focus {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.textonprimary};
          }
        `}
      </style>
    </>
  );
};

HeaderLogout.propTypes = {
  setShowModal: PropTypes.func,
  extraClass: PropTypes.string,
};

HeaderLogout.defaultProps = {
  setShowModal: () => false,
  extraClass: '',
};
