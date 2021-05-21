import React, { useContext } from 'react';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';
import { setSearchQueryAsync } from '../../helpers/searchAsync';
import { useDispatch, useSelector } from 'react-redux';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon';

const SearchListItem = ({ navItem, suggestiveSearch, submitSearch }) => {
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  const store = useSelector((state) => state);
  const searchQuery = store.search.searchQuery;

  const bolden = (item) => {
    const substr = searchQuery;
    const strRegExp = new RegExp(substr, 'g');

    return item.replace(strRegExp, `<strong>${substr}</strong>`);
  };

  return (
    <>
      <button
        className="search-item"
        aria-label="top search select"
        onClick={() => {
          //set search query state
          dispatch(setSearchQueryAsync(navItem, submitSearch));
        }}
      >
        <Icon faIcon={faSearch} size="16px" color="none" />
        {suggestiveSearch ? (
          <span dangerouslySetInnerHTML={{ __html: bolden(navItem) }} />
        ) : (
          <span>{navItem}</span>
        )}
      </button>
      <style jsx>{`
        .search-item {
          border: 0;
          background: none;
          display: block;
          color: ${theme.colors.bodytext};
          width: 100%;
          text-align: left;
          padding: 5px 10px;
        }
        .search-item span {
          margin-left: 6px;
        }
        .search-item:hover {
          background-color: ${theme.commoncolors.greyxlighter};
        }
      `}</style>
    </>
  );
};

SearchListItem.propTypes = {
  navItem: PropTypes.string.isRequired,
  suggestiveSearch: PropTypes.bool.isRequired,
  submitSearch: PropTypes.func,
};

export default SearchListItem;
