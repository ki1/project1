import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  replaceImageServer,
  usePlaceholderImage,
} from '../../../../helpers/image';
import DealMobileScrim from '../dealMobileScrim';
import ImageOverlays from '../ImageOverlays';
import LazyLoad from 'react-lazyload';
import {
  DEFAULT_DEAL_IMG_HEIGHT_MOBILE,
  DEFAULT_DEAL_IMG_WIDTH_MOBILE,
} from '../../../../config/setup/setup';
import ThemeContext from '../../../../providers/ThemeProvider';
import WrapLink from '../../../_generic/utils/WrapLink';
import { getIsLeadGen } from '../../../../helpers/deals';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

const CarouselImage = ({
  deal = {},
  image = {},
  onClick = undefined,
  disableClickAction = false,
  showImageOverlays = false,
  showScrim = true,
  lazy = false,
  load = false,
  href = null,
}) => {
  const theme = useContext(ThemeContext);
  const [active, setActive] = useState(() => load);
  const isLeadGen = getIsLeadGen(deal);
  const leadGenNumber = deal?.leadGen?.number;

  useEffect(() => {
    if (load && !active) {
      setActive(load);
    }
  }, [load, active]);

  if (!active) {
    return null;
  }

  let wrapLinkHref = !onClick ? href : undefined;
  if (isLeadGen && leadGenNumber && isMobile) {
    wrapLinkHref = `tel: ${leadGenNumber}`;
  }

  const imageComponent = (
    <WrapLink href={wrapLinkHref} isExternal={isLeadGen}>
      <picture className="single-image__picture">
        <source
          srcSet={replaceImageServer(
            deal.id,
            image,
            DEFAULT_DEAL_IMG_WIDTH_MOBILE,
            DEFAULT_DEAL_IMG_HEIGHT_MOBILE
          )}
          media={`(max-width: ${theme.breakpoints.smDown})`}
        />
        <img
          className="single-image__image"
          src={replaceImageServer(deal.id, image)}
          alt={image.alt}
          onError={usePlaceholderImage}
        />
      </picture>
      <ImageOverlays show={showImageOverlays} image={image} />
      {showScrim && <DealMobileScrim />}
    </WrapLink>
  );

  const onAction = () => {
    if (onClick && !disableClickAction) {
      onClick();
    }
  };

  return (
    <>
      <div
        tabIndex="0"
        className={classNames('single-image', {
          'single-image--isLeadGen': isLeadGen,
        })}
        onClick={onAction}
        onKeyPress={(e) => e.key === 'Enter' && onAction()}
        role="button"
      >
        {lazy ? (
          <LazyLoad once={true} offset={500}>
            {imageComponent}
          </LazyLoad>
        ) : (
          imageComponent
        )}
      </div>
      <style jsx>{`
        .single-image {
          display: block;
          cursor: pointer;
          height: 0;
          width: 100%;
          padding-bottom: 66.9%;
        }
        .single-image.single-image--isLeadGen {
          cursor: default;
        }
        .single-image:focus-visible {
          outline-offset: -5px;
        }
        :global(.single-image__picture) {
          display: block;
        }
        :global(.single-image__image) {
          width: 100%;
        }
      `}</style>
    </>
  );
};

CarouselImage.propTypes = {
  deal: PropTypes.object,
  image: PropTypes.object,
  onClick: PropTypes.func,
  disableClickAction: PropTypes.bool,
  showImageOverlays: PropTypes.bool,
  showScrim: PropTypes.bool,
  lazy: PropTypes.bool,
  load: PropTypes.bool,
  href: PropTypes.string,
};

export default CarouselImage;
