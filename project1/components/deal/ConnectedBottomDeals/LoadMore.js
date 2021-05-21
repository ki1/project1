import React, { useState, useRef } from 'react';
import 'intersection-observer';
import noop from 'lodash/noop';
import useClientSideEffect from '../../../helpers/useClientSideEffect';
import PropTypes from 'prop-types';

const LoadMore = ({ onTrigger = noop }) => {
  const observerRef = useRef();
  const whiskerRef = useRef(null);
  const [, setIsTriggered] = useState(false);

  useClientSideEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntry) => {
        setIsTriggered(observerEntry[0].isIntersecting);
        onTrigger();
      },
      {
        root: null,
        threshold: [0, 0.25, 0.5, 1],
        rootMargin: '0px 20% 0px 0px',
      }
    );

    observer.observe(whiskerRef.current);

    return () => observer.disconnect();
  }, [observerRef]);

  return (
    <>
      <div className="load-more">
        <div ref={whiskerRef} className="load-more__whisker" />
      </div>
      <style jsx>{`
        .load-more {
          height: 1px;
          width: 1px;
          position: relative;
        }

        .load-more__whisker {
          width: 100%;
          height: 1000px;
          position: absolute;
          bottom: 0;
        }
      `}</style>
    </>
  );
};

LoadMore.propTypes = {
  onTrigger: PropTypes.func.isRequired,
};

export default LoadMore;
