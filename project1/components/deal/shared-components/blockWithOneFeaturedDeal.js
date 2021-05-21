import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getAllBlocks } from '../../../helpers/dealsBlocks';
import { cutArray } from '../../../helpers/deals';
import { MAX_MEDIUM_DEALS_PER_ROW } from '../../../config/setup/setup';

const BlockWithOneFeaturedDeal = ({ deals, position }) => {
  const cutDealsArray = cutArray(deals, MAX_MEDIUM_DEALS_PER_ROW);
  const filtersURL = useSelector((state) => state.filters.url);

  return <>{getAllBlocks(cutDealsArray, position, filtersURL)}</>;
};

BlockWithOneFeaturedDeal.propTypes = {
  deals: PropTypes.arrayOf(PropTypes.object),
  position: PropTypes.number,
};

BlockWithOneFeaturedDeal.defaultProps = {
  deals: [],
  position: 0,
};

export default BlockWithOneFeaturedDeal;
