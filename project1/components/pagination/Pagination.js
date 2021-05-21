import React, { useContext, useState, useEffect } from 'react';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getLocationShortName } from '../../helpers/location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/footer/Footer';
import ThemeContext from '../../providers/ThemeProvider';
import { getScreenBreakpoint } from '../../helpers/screen';
import { scrollToTop } from '../../helpers/infiniteScroll';
import { setLastId } from '../../redux/actions/deals';
import { HIDE_FOOTER, SHOW_FOOTER, BACK_TO_TOP } from '../../config/text/text';
import Proptypes from 'prop-types';

/* eslint-disable-next-line sonarjs/cognitive-complexity */
const Pagination = ({ showPagination = false }) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const [footer, setFooter] = useState(false);
  const showFooter = () => setFooter(true);
  const hideFooter = () => setFooter(false);
  const [pagination, setPagination] = useState(false);
  const [location] = useSelector((state) => [
    state.locations.location,
    state.deals.lastPage,
  ]);
  const shortName = getLocationShortName(location);

  useEffect(() => {
    if (showPagination) {
      setPagination(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showPaginationBar = () => {
    const lastKnownScrollPosition = window.scrollY;
    if (lastKnownScrollPosition > 2000) {
      setPagination(true);
    } else {
      setPagination(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', showPaginationBar);
    return () => {
      window.removeEventListener('scroll', showPaginationBar);
    };
  }, []);

  const isDesktop = () => {
    return getScreenBreakpoint() !== 'sm';
  };

  return (
    <>
      {pagination && (
        <div
          className={`pagination ${
            footer ? 'pagination-expanded' : 'pagination-collapsed'
          }`}
        >
          <span
            className="pagination-side"
            onClick={() => {
              scrollToTop(router, 0);
              dispatch(setLastId(0));
            }}
            onKeyPress={() => {
              scrollToTop(router, 0);
              dispatch(setLastId(0));
            }}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon
              className="chevron"
              icon={faAngleUp}
              title={BACK_TO_TOP}
            />
            <span>{BACK_TO_TOP}</span>
          </span>
          {!footer && isDesktop() && (
            <div
              className="pagination-side"
              onClick={() => showFooter()}
              onKeyPress={() => showFooter()}
              role="button"
              tabIndex={0}
            >
              {SHOW_FOOTER}
              <FontAwesomeIcon
                className="chevron"
                icon={faAngleDown}
                title="View Footer"
              />
            </div>
          )}
          {footer && isDesktop() && (
            <div
              className="pagination-side"
              onClick={() => hideFooter()}
              onKeyPress={() => hideFooter()}
              role="button"
              tabIndex={0}
            >
              {HIDE_FOOTER}
              <FontAwesomeIcon
                className="chevron"
                icon={faAngleUp}
                title="Hide Footer"
              />
            </div>
          )}
        </div>
      )}
      {footer && (
        <div className="footer">
          <Footer
            site={process.env.NEXT_PUBLIC_SITE}
            isSecurePage={false}
            locationShortName={shortName}
          />
        </div>
      )}
      <style jsx>{`
        .pagination {
          align-content: center;
          background-color: #e8e8e8;
          display: flex;
          height: 60px;
          left: 0;
          padding: 10px;
          position: fixed;
          justify-content: space-around;
          width: 100%;
          z-index: 999;
        }
        .pagination-side {
          cursor: pointer;
        }
        :global(.chevron) {
          color: ${theme.colors.primary};
          cursor: pointer;
          margin: 0 10px;
          font-size: 48px;
          vertical-align: middle;
        }
        .pagination-collapsed {
          bottom: 0;
        }
        .pagination-expanded {
          bottom: 300px;
        }
        .footer {
          bottom: 0;
          left: 0;
          height: 300px;
          right: 0;
          position: fixed;
          z-index: 999;
        }
      `}</style>
    </>
  );
};

Pagination.proptypes = {
  showPagination: Proptypes.bool,
};

export default Pagination;
