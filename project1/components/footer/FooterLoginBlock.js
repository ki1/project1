import React from 'react';

import { MYACCOUNT_FOOTER_TEXT } from '../../config/text/text';
import { BRAND_WOWCHER } from '../../config/setup/setup';

const Footer = () => {
  const Environment = process.env.NEXT_PUBLIC_BRAND || BRAND_WOWCHER;

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <div
            dangerouslySetInnerHTML={{
              __html: MYACCOUNT_FOOTER_TEXT[Environment],
            }}
          ></div>
          <p></p>
        </div>
      </footer>
      <style jsx>{`
        .footer__container {
          width: 100%;
          max-width: 1024px;
          margin: 0 auto;
        }

        footer {
          position: relative;
          z-index: 1;
          background: #333;
          background: #333;
          color: #fff;
          padding: 15px 10px;
        }
        footer p {
          margin-bottom: 0px;
        }

        @media (min-width: 768px) {
          footer {
            padding: 30px;
          }
          footer p {
            font-size: 1.4rem;
          }
        }
      `}</style>
      <style jsx global>{`
        footer a {
          color: #fff;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default Footer;
