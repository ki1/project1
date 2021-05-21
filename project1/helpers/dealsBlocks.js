import XLDealCard from '../components/deal/xldealcard';
import FeaturedDealCard from '../components/deal/featuredDealCard';
import MediumDeal from '../components/deal/mediumDeal';
import { hashCode } from './hash';

const FeaturedBlockA = (dealsAux, position, filtersURL = '') => {
  // We show a featured deal only if position is 0 and featureCAtegoryDeal || featuredSubCatDeal is true
  return (
    <div
      className="row cols bottom-deals-block sequence-of-3 sequence-type-A"
      key={`FeaturedBlockA_div_${hashCode(
        dealsAux[0] && dealsAux[0].id ? dealsAux[0].id.toString() : ''
      )}_div`}
    >
      <div className="main-deal xl-deal-item item">
        {!position &&
        dealsAux[0].display &&
        (dealsAux[0].display.featuredCategoryDeal.isActive ||
          dealsAux[0].display.featuredSubCatDeal.isActive) ? (
          <FeaturedDealCard
            deal={dealsAux[0]}
            key={`FeaturedBlockA0_${hashCode(
              dealsAux[0] && dealsAux[0].id ? dealsAux[0].id.toString() : ''
            )}_0`}
            filtersURL={filtersURL}
          />
        ) : (
          <XLDealCard
            deal={dealsAux[0]}
            key={`FeaturedBlockA0_${hashCode(
              dealsAux[0] && dealsAux[0].id ? dealsAux[0].id.toString() : ''
            )}_0`}
            filtersURL={filtersURL}
          />
        )}
      </div>

      <div className="side-deals xl-deal-item item">
        <div className="full-row cols-display ipad-row">
          {dealsAux[1] && (
            <MediumDeal
              deal={dealsAux[1] || {}}
              key={`FeaturedBlockA1_${hashCode(
                dealsAux[1] && dealsAux[1].id ? dealsAux[1].id.toString() : ''
              )}_1`}
              filtersURL={filtersURL}
            />
          )}
          {dealsAux[2] && (
            <MediumDeal
              deal={dealsAux[2] || {}}
              key={`FeaturedBlockA2_${hashCode(
                dealsAux[2] && dealsAux[2].id ? dealsAux[2].id.toString() : ''
              )}_2`}
              filtersURL={filtersURL}
            />
          )}
        </div>
      </div>
    </div>
  );
};
const FeaturedBlockB = (dealsAux, position, filtersURL = '') => {
  if (!dealsAux || dealsAux.length < 3) return normalBlock(dealsAux, position);
  return (
    <div
      className="row cols bottom-deals-block sequence-of-3 sequence-type-B"
      key={`FeaturedBlockB_div_${hashCode(
        dealsAux[0] && dealsAux[0].id ? dealsAux[0].id.toString() : ''
      )}_div`}
    >
      <div className="side-deals xl-deal-item item">
        <div className="full-row cols-display ipad-row">
          {dealsAux[0] && (
            <MediumDeal
              deal={dealsAux[0] || {}}
              key={`FeaturedBlockB1_${hashCode(
                dealsAux[0] && dealsAux[0].id ? dealsAux[0].id.toString() : ''
              )}_0`}
              filtersURL={filtersURL}
            />
          )}
          {dealsAux[1] && (
            <MediumDeal
              deal={dealsAux[1] || {}}
              key={`FeaturedBlockB2_${hashCode(
                dealsAux[1] && dealsAux[1].id ? dealsAux[1].id.toString() : ''
              )}_1`}
              filtersURL={filtersURL}
            />
          )}
        </div>
      </div>
      <div className="main-deal xl-deal-item item">
        {dealsAux[2] && (
          <XLDealCard
            deal={dealsAux[2]}
            key={`FeaturedBlockB3_${hashCode(
              dealsAux[2] && dealsAux[2].id ? dealsAux[2].id.toString() : ''
            )}_2`}
            filtersURL={filtersURL}
          />
        )}
      </div>
    </div>
  );
};
/*
const getFeaturedBlock = (dealsAux) => {
  if (dealsAux.length < 3) return normalBlock(dealsAux);
  if (Math.floor(Math.random() * 2) === 0) {
    return FeaturedBlockA(dealsAux);
  }
  return FeaturedBlockB(dealsAux);
};
*/

const getEmptyDeals = (index) => {
  let total = index % 3;
  if (total === 0) return null;
  if (total === 2)
    return (
      <div
        className="card medium-deal deal_item empty-medium-deal empty-medium-deal1"
        extraclasses="medium-deal-i-3"
      >
        &nbsp;
      </div>
    );
  return (
    <>
      <div
        className="card medium-deal deal_item empty-medium-deal empty-medium-deal1"
        extraclasses="medium-deal-i-2"
      >
        &nbsp;
      </div>
      <div
        className="card medium-deal deal_item empty-medium-deal empty-medium-deal2"
        extraclasses="medium-deal-i-3"
      >
        &nbsp;
      </div>
    </>
  );
};

const normalBlock = (dealsAux, position = '', filtersURL = '') => {
  return (
    <div
      className="medium-deals-block row cols bottom-deals-block sequence-blocks"
      key={`normalblock_div_${
        dealsAux && dealsAux[0] ? dealsAux[0].id : position
      }_${position}_div`}
    >
      {dealsAux.map((item, index) => (
        <MediumDeal
          deal={item || {}}
          key={`normalBlock_mediumdeal_${hashCode(
            item && item.id ? item.id.toString() : ''
          )}_${index}`}
          extraclasses={`medium-deal-i-${(index % 3) + 1}`}
          filtersURL={filtersURL}
        />
      ))}
      {getEmptyDeals(dealsAux.length)}
    </div>
  );
};

/*
// This function can use a Featured Deal in the middle
export const getAllBlocksInAllRowsRandom = (dealsAux) => {
  if (!dealsAux || !dealsAux.length) return null;
  if (dealsAux.length === 1) {
    return normalBlock(dealsAux[0]);
  }
  if (dealsAux.length === 2) {
    if (Math.floor(Math.random() * 2) === 0) {
      return [getFeaturedBlock(dealsAux[0]), normalBlock(dealsAux[1])];
    } else {
      return [normalBlock(dealsAux[0]), getFeaturedBlock(dealsAux[1])];
    }
  }
  const randomLayout = Math.floor(Math.random() * 3);
  if (randomLayout === 0) {
    return [
      getFeaturedBlock(dealsAux[0]),
      normalBlock(dealsAux[1]),
      normalBlock(dealsAux[2]),
    ];
  } else if (randomLayout === 1) {
    return [
      normalBlock(dealsAux[0]),
      getFeaturedBlock(dealsAux[1]),
      normalBlock(dealsAux[2]),
    ];
  }
  return [
    normalBlock(dealsAux[0]),
    normalBlock(dealsAux[1]),
    getFeaturedBlock(dealsAux[2]),
  ];
};

// This Funtion only use Featured deals in the first or last row
export const getAllBlocksRandom = (dealsAux) => {
  if (!dealsAux || !dealsAux.length) return null;
  if (dealsAux.length === 1) {
    return normalBlock(dealsAux[0]);
  }
  if (dealsAux.length === 2) {
    return [getFeaturedBlock(dealsAux[0]), normalBlock(dealsAux[1])];
  }
  const randomLayout = Math.floor(Math.random() * 2);
  if (randomLayout === 0) {
    return [
      getFeaturedBlock(dealsAux[0]),
      normalBlock([...dealsAux[1], ...dealsAux[2]]),
    ];
  }
  return [
    normalBlock([...dealsAux[0], ...dealsAux[1]]),
    getFeaturedBlock(dealsAux[2]),
  ];
};
*/

/*
 * This Funtion show the Featured deals on the left for even blocks
 * and on the right side for the odd blocks
 */
export const getAllBlocks = (dealsAux, position, filtersURL = '') => {
  if (!dealsAux || !dealsAux.length) return null;
  if (dealsAux.length === 1) {
    // return [normalBlock(dealsAux[0], position)];
    return FeaturedBlockA(dealsAux[0], position, filtersURL);
  }
  if (dealsAux.length === 2) {
    return [
      FeaturedBlockA(dealsAux[0], position, filtersURL),
      normalBlock(dealsAux[1], position, filtersURL),
    ];
  }
  if (position % 2 === 0) {
    return [
      FeaturedBlockA(dealsAux[0], position, filtersURL),
      normalBlock([...dealsAux[1], ...dealsAux[2]], position, filtersURL),
    ];
  }
  return [
    FeaturedBlockB(dealsAux[0], position, filtersURL),
    normalBlock([...dealsAux[1], ...dealsAux[2]], position, filtersURL),
  ];
};
