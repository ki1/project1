import React, { useContext, useEffect } from 'react';
import ButtonForm from '../_generic/button/CTAButton';
import {
  TEXT_404_SERIOUSLY,
  TEXT_404_LOOKS_LIKE,
  TEXT_404_CONTINUE_SHOPPING,
  OR_SEARCH_INSTEAD,
} from '../../config/text/text';
import { LINK_HOME } from '../../config/links/links';
import { redirectToURL } from '../../helpers/url';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import HeaderSearch from '../header/HeaderSearch';
import ThemeContext from '../../providers/ThemeProvider';
import { sendErrorDataToSplunk } from '../_generic/axiosSplunk/axiosSplunk';
import ErrorTrackingService from '../../helpers/errorTrackingService';

const Form404 = ({ statusCode }) => {
  const router = useRouter();
  const theme = useContext(ThemeContext);

  const goToDeals = () => redirectToURL(LINK_HOME, router);

  useEffect(() => {
    sendErrorDataToSplunk(router);
    ErrorTrackingService.logError({
      name: 'UNHANDLED 404 PAGE',
      message: 'User was redirected to a 404 page.',
      path: `${LINK_HOME}${router.asPath}`,
    });
  }, [router]);

  return (
    <div className="not-found">
      <div className="not-found__content">
        <h2 className="not-found__title">
          {TEXT_404_SERIOUSLY.replace('##STATUSCODE##', statusCode)}
        </h2>
        <div className="not-found__message">{TEXT_404_LOOKS_LIKE}</div>
        <div className="not-found__continue">
          <ButtonForm
            onClick={() => goToDeals()}
            disabled={false}
            primaryAction={true}
            gradientButton={true}
          >
            {TEXT_404_CONTINUE_SHOPPING}
          </ButtonForm>
        </div>

        <div className="not-found__search">
          <div className="search-input">
            <HeaderSearch defaultPlaceholder={OR_SEARCH_INSTEAD} />
          </div>
        </div>
      </div>
      <style jsx global>{`
        .not-found__content {
          margin: 0 auto;
          width: 100%;
          color: #fff;
          padding: 50px 80px 0 40px;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          // 768
          .not-found__content {
            max-width: 768px;
          }
          .not-found {
            background-position: center 0;
          }
        }
        @media (min-width: ${theme.breakpoints.lgUp}) {
          // 992
          .not-found__content {
            max-width: 992px;
          }
        }
        @media (min-width: ${theme.breakpoints.xlUp}) {
          // 1200
          .not-found__content {
            max-width: 1200px;
          }
        }
        .not-found__title {
          margin: 0;
          max-width: 365px;
          color: #fff;
          font-weight: 400;
          font-size: 44px;
          font-size: 4.4rem;
          line-height: 50px;
          line-height: 5rem;
        }
        .not-found__message {
          color: #fff;
          max-width: 375px;
          margin-bottom: 20px;
          font-size: 30px;
          font-size: 3rem;
          line-height: 35px;
          line-height: 3.5rem;
        }
        .not-found {
          height: 410px;
          background-image: url(${theme.images.error404});
          background-repeat: no-repeat;
          background-color: #383838;
        }

        .not-found__search {
          margin-top: 20px;
          max-width: 365px;
        }

        @media (max-width: ${theme.breakpoints.mdUp}) {
          .not-found__title {
            font-size: 30px;
            font-size: 3rem;
            line-height: 35px;
            line-height: 3.5rem;
            max-width: 300px;
          }
          .not-found__message {
            font-size: 18px;
            font-size: 1.8rem;
            line-height: 24px;
            line-height: 2.4rem;
            max-width: 300px;
          }
          .not-found__search {
            max-width: 300px;
          }
          .not-found__content {
            padding: 50px 15px 0;
          }
        }
      `}</style>
    </div>
  );
};

Form404.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Form404.defaultProps = {
  statusCode: '404',
};

export default Form404;
