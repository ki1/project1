import React from 'react';
import PropTypes from 'prop-types';
import FooterLink from './FooterLink';
import FooterColHeading from './FooterColHeading';

const FooterLinkList = ({ linksList = [], title = '' }) => {
  return (
    <>
      <div className="footer-link-list-container">
        <FooterColHeading>{title}</FooterColHeading>
        <ul className="footer-link-list">
          {linksList.map((link, i) => {
            return <FooterLink key={i} text={link.text} href={link.href} />;
          })}
        </ul>
      </div>
      <style jsx>{`
        .footer-link-list {
          display: inline;
          list-style: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};

export default FooterLinkList;

FooterLinkList.propTypes = {
  linksList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};
