import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Form404 from './form404';
import Footer from '../../components/footer/Footer';
import { getLocationShortName } from '../../helpers/location';

const Form404Block = ({ statusCode, isSecurePage }) => {
  const [location] = useSelector((state) => [state.locations.location]);
  const shortName = getLocationShortName(location);

  return (
    <>
      <Form404 statusCode={statusCode} />
      <Footer
        site={process.env.NEXT_PUBLIC_SITE || 'wowcher'}
        isSecurePage={isSecurePage}
        locationShortName={shortName}
      />
    </>
  );
};

Form404Block.propTypes = {
  statusCode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSecurePage: PropTypes.bool,
};

Form404Block.defaultProps = {
  statusCode: '404',
  isSecurePage: false,
};

export default Form404Block;
