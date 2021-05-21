import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { LINK_SEARCH_PAGE } from '../../config/links/links';
import Spinner from '../_generic/spinner/spinner';
import SearchListItem from './SearchListItem';
import PropTypes from 'prop-types';
import {
  getSuggestedSearches,
  setSearchPanelVisibility,
  setSearchQuery,
  getTopSearches,
} from '../../redux/actions/search';
import ThemeContext from '../../providers/ThemeProvider';
import { BRAND_WOWCHER } from '../../config/setup/setup';
import {
  SEARCH_PLACEHOLDER,
  SEARCH_INPUT_ARIA_LABEL,
  SEARCH_BUTTON_ARIA_LABEL,
  SUGGESTIONS_TITLE,
  TOP_SEARCHES_TITLE,
} from '../../config/text/text';
import classNames from 'classnames';
import Icon from '../Icon';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { redirectToURL } from '../../helpers/url';

const HeaderSearch = ({ defaultPlaceholder }) => {
  const Environment = process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER;
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const topSearches = getTopSearches();
  const store = useSelector((state) => state);
  const userLocation = store.locations.location.name;
  const { searchQuery, panelVisible, status, suggestions } = store.search;
  const isDisabled = !searchQuery || !searchQuery.length ? 'disabled' : null;
  const searchPanelClassNames = classNames('search-suggestions', {
    hidden: !panelVisible,
    visible: panelVisible,
  });
  const showTopSearches = searchQuery.length < 3 || suggestions?.length < 1;
  const searchPanelResults = showTopSearches ? topSearches : suggestions;

  // This useEffect needs to be executed only once
  useEffect(() => {
    //gets search value from URL querystring if one is present
    const { q } = router.query;
    const urlQuerySearch = searchQuery || q;

    urlQuerySearch && dispatch(setSearchQuery(urlQuerySearch));
  }, [router]);

  const submitSearch = (query) => {
    const searchUrl = `${LINK_SEARCH_PAGE}?q=${query}`;
    redirectToURL(searchUrl);
  };

  return (
    <>
      <div className="search-container">
        <input
          data-testid="search-input"
          aria-label={SEARCH_INPUT_ARIA_LABEL[Environment]}
          className="input"
          data-qa="enterSearch"
          id="header-search"
          type="text"
          autoComplete="off"
          value={searchQuery}
          placeholder={
            defaultPlaceholder && defaultPlaceholder.length
              ? defaultPlaceholder
              : SEARCH_PLACEHOLDER
          }
          onFocus={() => dispatch(setSearchPanelVisibility(true))}
          onBlur={() =>
            setTimeout(() => dispatch(setSearchPanelVisibility(false)), 200)
          }
          onChange={(event) =>
            dispatch(getSuggestedSearches(event, userLocation))
          }
          onKeyDown={(event) => {
            event.key === 'Enter' && submitSearch(searchQuery);
          }}
        ></input>
        <button
          className="button search-input__submit-button"
          data-testid="search-submit-button"
          aria-label={SEARCH_BUTTON_ARIA_LABEL}
          onClick={() => submitSearch(searchQuery)}
          disabled={isDisabled}
        >
          <Icon faIcon={faSearch} size="19px" color="none" />
        </button>
      </div>

      <div className={searchPanelClassNames}>
        {status && <Spinner hasMsg={false} data-testid="search-loader" />}
        {
          <div className="top-searches" data-testid="search-panel-container">
            {showTopSearches ? (
              <h3>{TOP_SEARCHES_TITLE}</h3>
            ) : (
              <h3>{SUGGESTIONS_TITLE}</h3>
            )}
            {searchPanelResults &&
              searchPanelResults.length > 0 &&
              searchPanelResults.map((navItem, index) => {
                return (
                  <SearchListItem
                    navItem={navItem}
                    suggestiveSearch={!showTopSearches}
                    submitSearch={submitSearch}
                    key={index}
                  />
                );
              })}
          </div>
        }
      </div>
      <style jsx>{`
        .search-suggestions {
          display: none;
          border-radius: 6px;
          box-shadow: 0 0 5px rgb(0 0 0 / 40%);
          position: absolute;
          min-height: 250px;
          top: 42px;
          left: 15px;
          width: 96.7%;
          background-color: ${theme.commoncolors.white};
          z-index: 1002;
          overflow: hidden;
        }
        .search-suggestions.visible {
          display: block;
        }
        .search-suggestions h3 {
          color: ${theme.colors.primary};
          padding: 5px 10px;
        }
        .suggestive-search-results {
          text-align: center;
          color: ${theme.colors.primary};
          font-weight: bold;
        }
        .search-input__submit-button:disabled {
          cursor: not-allowed;
        }
        .search-container {
          display: block;
          margin-top: 2px;
          position: relative;
        }
        .button {
          background-color: ${theme.colors.searchbuttonbg};
          border: 0;
          border-radius: 0px 20px 20px 0px;
          color: ${theme.colors.primary};
          height: 31px;
          position: absolute;
          right: 1px;
          top: 1px;
          width: 38px;
        }
        .input {
          background-color: ${theme.colors.searchbg};
          border-color: ${theme.colors.primary};
          border-width: 1px;
          border-style: solid;
          border-radius: 20px;
          height: 33px;
          margin-bottom: 6px;
          padding: 0 45px 0 8px;
          width: 100%;
        }
        .input::placeholder {
          font-size: 12px;
          color: ${theme.colors.searchplaceholder};
          text-transform: ${defaultPlaceholder && defaultPlaceholder.length
            ? theme.text.error404placeholder
            : theme.text.search};
        }
        .input:focus {
          border-color: ${theme.colors.searchborderfocused};
          background-color: ${theme.colors.searchbgfocused};
          outline: none;
        }
        .button:focus {
          background-color: ${theme.colors.searchbuttonbgfocused};
          color: ${theme.colors.searchbuttonfocused};
        }
        .input:focus ~ .button {
          background-color: ${theme.colors.searchbuttonbgfocused};
          color: ${theme.colors.searchbuttonfocused};
        }
        .button:focus ~ .input {
          border-color: ${theme.colors.searchborderfocused};
          background-color: ${theme.colors.searchbgfocused};
          outline: none;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .button {
            height: 38px;
            width: 38px;
          }
          .input {
            height: 40px;
            margin-bottom: 0;
          }
          .input::placeholder {
            font-size: 14px;
          }
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .search-suggestions {
            top: 35px;
            width: 91%;
          }
        }
      `}</style>
    </>
  );
};

HeaderSearch.propTypes = {
  defaultPlaceholder: PropTypes.string,
};

HeaderSearch.defaultProps = {
  defaultPlaceholder: '',
};

export default HeaderSearch;
