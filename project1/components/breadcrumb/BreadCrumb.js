import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useBreadcrumbs } from '../../helpers/breadcrumbs';
import ThemeContext from '../../providers/ThemeProvider';
import classNames from 'classnames';

const BreadCrumb = ({ deal, className }) => {
  const theme = useContext(ThemeContext);
  const breadcrumbs = useBreadcrumbs(deal);

  const getLastElement = (index, max, item) => {
    if (index + 1 >= max) return <span itemProp="name">{item.linkText}</span>;
    return (
      <a itemProp="item" href={item.url}>
        <span itemProp="name">{item.linkText}</span>
      </a>
    );
  };

  if (!breadcrumbs || breadcrumbs.length <= 1) return null;

  return (
    <>
      <ul
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={classNames('breadcrumb-container', className)}
      >
        {breadcrumbs.map((item, index) => {
          return (
            <li
              key={`breadcrumb_item__${index}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {getLastElement(index, breadcrumbs.length, item)}
              <meta itemProp="position" content={`${index + 1}`} />
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .breadcrumb-container {
          list-style: none;
          margin-left: 0px;
          margin-block-start: 0em;
          margin-block-end: 0px;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 0px;
        }
        .breadcrumb-container > li {
          display: inline;
        }
        .breadcrumb-container > li:after {
          font-family: 'Open Sans';
          content: '>';
          color: #000;
          position: relative;
          font-size: 1rem;
          margin: 0 8px 0 8px;
          top: -1px;
        }
        .breadcrumb-container > li:last-child:after {
          content: none;
        }
      `}</style>
      <style jsx global>{`
        .breadcrumb-container > li > a {
          cursor: pointer;
          color: ${theme.colors.breadcrumb};
          text-transform: capitalize;
          text-decoration: none;
        }
        .breadcrumb-container > li:last-child > a {
          color: '#333333';
        }
        .breadcrumb-container > li > a:hover {
          color: ${theme.colors.primary};
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default BreadCrumb;

BreadCrumb.propTypes = {
  deal: PropTypes.object,
  className: PropTypes.string,
};

BreadCrumb.defaultProps = {
  deal: null,
  className: '',
};
