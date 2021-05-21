import React, { useContext } from 'react';
import {
  DOWNLOAD_THE_APP,
  FOOTER_COMPANY_TITLE,
  FOOTER_DEALS_TITLE,
  FOOTER_CUTOMER_SERVICE_TITLE,
} from '../../config/text/text';
import {
  FOOTER_DEALS_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_CUSTOMER_SERVICE_LINKS,
  LINKS_GLOBAL_WOWCHER,
} from '../../config/links/links';
import FooterLinkList from './FooterLinkList';
import DownloadAppLinks from './DownloadAppLinks';
import FooterColHeading from './FooterColHeading';
import CareersImageLink from './CareersImageLink';
import SocialMediaShareButtons from './SocialMediaShareButtons';
import FooterLegalText from './FooterLegalText';
import FooterContainer from './FooterContainer';
import FooterCol from './footerCol';
import ThemeContext from '../../providers/ThemeProvider';
import PropTypes from 'prop-types';

const Footer = ({ site, isSecurePage, locationShortName }) => {
  const theme = useContext(ThemeContext);

  let deals = [...FOOTER_DEALS_LINKS[site]];
  if (site === 'wowcher') {
    deals.unshift({
      text: 'Local',
      href: `${
        LINKS_GLOBAL_WOWCHER[process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod'][
          process.env.NEXT_PUBLIC_SITE || 'wowcher'
        ]
      }/deals/${locationShortName}`,
    });
  }

  return (
    <>
      <FooterContainer>
        <div className="footer__row footer__row--flex footer__row--links">
          <FooterCol>
            <FooterLinkList title={FOOTER_DEALS_TITLE} linksList={deals} />
          </FooterCol>
          <FooterCol>
            <FooterLinkList
              title={FOOTER_COMPANY_TITLE}
              linksList={FOOTER_COMPANY_LINKS[site]}
            />
          </FooterCol>
          <FooterCol>
            <FooterLinkList
              title={FOOTER_CUTOMER_SERVICE_TITLE}
              linksList={FOOTER_CUSTOMER_SERVICE_LINKS[site]}
            />
          </FooterCol>
          <FooterCol className="footer__col--hidden-mobile">
            <FooterColHeading>{DOWNLOAD_THE_APP}</FooterColHeading>
            <DownloadAppLinks site={site} />
          </FooterCol>
          <FooterCol
            className="footer__col--hidden-mobile"
            noRender={site !== 'wowcher'}
          >
            <CareersImageLink />
          </FooterCol>
        </div>
        <div className="footer__row">
          <FooterLegalText site={site} isSecurePage={isSecurePage} />
        </div>
        <div className="footer__row footer__row--flex footer__row--social">
          <SocialMediaShareButtons site={site} />
        </div>
      </FooterContainer>
      <style jsx>{`
        .footer__row {
          margin-bottom: 12px;
        }
        .footer__row:last-child {
          margin-bottom: 0;
        }
        .footer__row--flex {
          display: flex;
        }
        .footer__row--social {
          justify-content: flex-end;
        }
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .footer__row {
            margin-bottom: 0;
          }
          .footer__row--flex {
            flex-direction: column;
          }
          .footer__row--social {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

Footer.propTypes = {
  site: PropTypes.string,
  isSecurePage: PropTypes.bool,
};

Footer.defaultProps = {
  site: 'wowcher',
  isSecurePage: false,
};

export default Footer;
