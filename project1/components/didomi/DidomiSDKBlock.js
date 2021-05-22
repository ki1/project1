import React, { useContext } from 'react';
import { DidomiSDK } from '@didomi/react';
import { DIDOMI_KEY } from '../../config/setup/setup';
import ThemeContext from '../../providers/ThemeProvider';
import { isLightPage } from '../../helpers/browser';

const didomiConfig = {
  app: {
    apiKey: DIDOMI_KEY,
    vendors: {
      iab: {
        all: true,
      },
    },
  },
  cookies: {
    local: {
      customDomain: `www.${process.env.NEXT_PUBLIC_PROD_DOMAIN_NAME}`,
    },
  },
};

const DidomiSDKBlock = () => {
  if (typeof window !== 'undefined') {
    didomiConfig.cookies.local.customDomain = window.location.hostname;
  }

  const theme = useContext(ThemeContext);
  return (
    !isLightPage() && (
      <>
        <DidomiSDK config={didomiConfig} gdprAppliesGlobally={true} />
        <style jsx global>{`
          #didomi-host {
            border: none !important;
            font-family: 'Arial, Helvetica, sans-serif';
          }

          #didomi-notice.didomi-regular-notice.shape-panel {
            max-width: 100% !important;
          }

          .didomi-notice__interior-border.didomi-border {
            display: flex !important;
            justify-content: space-between !important;
          }

          .didomi-notice-banner {
            background-color: ${theme.colors.didomibackgroundcolor} !important;
            border: 0 !important;
            border-radius: 10px !important;
            opacity: 0.95 !important;
            right: 0px !important;
            width: 100% !important;
          }

          .didomi-notice-banner .didomi-border {
            border: 0 !important;
          }

          .didomi-notice-banner .didomi-notice-text {
            color: ${theme.colors.bidomicolor};
            // font-size: 1.5rem;
            font-weight: bold;
            margin: 10px 5px;
            margin: 10px !important;
          }

          @media (max-width: ${theme.breakpoints.mdUp}) {
            .didomi-notice-banner .didomi-notice-text {
              width: 100% !important;
              margin: 5px !important;
            }
          }
          .didomi-notice-view-partners-link {
            display: none;
          }

          .didomi-buttons {
            margin: 5px !important;
            margin-left: auto;
          }
          .didomi-buttons .didomi-learn-more-button {
            display: none !important;
          }

          .didomi-buttons .didomi-dismiss-button {
            background-color: ${theme.colors.primary} !important;
            border-radius: 5px !important;
            color: ${theme.colors.bidomicolor} !important;
            // font-size: 1.5rem !important;
            font-weight: bold !important;
            text-decoration: none !important;
          }
        `}</style>
      </>
    )
  );
};

export default DidomiSDKBlock;
