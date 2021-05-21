import React, { useState } from 'react';
import HeaderIcon from './HeaderIcon';
import HeaderLocationList from './HeaderLocationList';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/actions/locations';
import { CHANGE_LOCATION } from '../../config/text/text';
import WowModal from '../WowModal';
// import { getNavigation } from '../../redux/actions/navigation';
import { makeUrlAbsolute } from '../../helpers/url';

const HeaderLocation = ({ brand, site, countryCode }) => {
  const [locations, location] = useSelector((state) => [
    state.locations.locations,
    state.locations.location,
  ]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const onClickIcon = (show) => {
    setShowModal(show);
  };

  const onSelectLocation = (locationToSet) => {
    dispatch(setLocation(locationToSet, true));
    // TODO: change to router after react is fully in prod
    // Going to Angular initially so need to reload the page
    // dispatch(getNavigation(locationToSet));
    if (typeof window !== 'undefined') {
      const url = makeUrlAbsolute(`deals/${locationToSet.shortName}`);
      window.location.href = url;
    }
    setShowModal(false);
  };

  return (
    <>
      <WowModal
        showModal={showModal}
        setShowModal={setShowModal}
        size="lg"
        ariaLabelledBy="id-choose-loc"
        extraClasses="fullscreen-mobile remove-header with-fade-in no-body-padding"
        backdropClassName="remove-backdrop"
      >
        <HeaderLocationList
          brand={brand}
          site={site}
          selection={location}
          locations={locations}
          countryCode={countryCode}
          onCancel={() => setShowModal(false)}
          onSelectLocation={onSelectLocation}
        />
      </WowModal>

      <HeaderIcon
        clickMethod={() => onClickIcon(true)}
        icon="location"
        isFirst={true}
        linkId="id-choose-loc"
        aria-label={CHANGE_LOCATION}
        extraClasses="with-fade-in"
      />
    </>
  );
};

HeaderLocation.propTypes = {
  brand: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  countryCode: PropTypes.string,
  modlaContainer: PropTypes.element, // use only in storybook
};

export default HeaderLocation;
