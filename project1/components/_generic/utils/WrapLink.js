import Link from 'next/link';
import PropTypes from 'prop-types';

// conditionally wrap children in link
const WrapLink = ({ href, children, isExternal = false }) => {
  if (isExternal) {
    return <a href={href}>{children}</a>;
  }

  if (href) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  } else {
    return children;
  }
};

WrapLink.propTypes = {
  href: PropTypes.string,
  isExternal: PropTypes.bool,
};

export default WrapLink;
