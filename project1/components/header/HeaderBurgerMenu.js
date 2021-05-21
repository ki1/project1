import React, { useState } from 'react';
import HeaderIcon from './HeaderIcon';
import WowModal from '../WowModal';
import MobileMenu from './mobilenav/MobileMenu';
import PropTypes from 'prop-types';

const BurgerMenu = ({ navigation, path, isLoggedIn }) => {
  const [showModal, setShowModal] = useState(false);
  const [dimensions, setDimensions] = useState({ bottom: 0 });
  const ref = React.createRef();

  const openMenu = (show) => {
    if (ref.current) {
      setDimensions({
        bottom: ref.current.getBoundingClientRect().bottom,
      });
    }
    setShowModal(show);
  };

  const isLoggedInClass = isLoggedIn ? 'is-logged-in' : '';
  const modalExtraClasses = `${isLoggedInClass} slide-out-menu remove-header with-slide-in no-body-padding no-rounded-corners`;

  return (
    <div ref={ref}>
      <WowModal
        showModal={showModal}
        setShowModal={setShowModal}
        size="lg"
        ariaLabelledBy="id-burger-menu"
        extraClasses={modalExtraClasses}
        backdropClassName="remove-backdrop"
        topPosition={dimensions.bottom}
      >
        <MobileMenu navigation={navigation} path={path} />
      </WowModal>

      <HeaderIcon
        linkId="id-burger-menu"
        icon="burger"
        isFirst={true}
        clickMethod={() => openMenu(true)}
      />
    </div>
  );
};

export default BurgerMenu;

BurgerMenu.propTypes = {
  navigation: PropTypes.array,
  path: PropTypes.string,
  isLoggedIn: PropTypes.bool,
};
