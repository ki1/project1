import { useState } from 'react';
import useClientSideEffect from './useClientSideEffect';

// Polyfill
if (typeof window !== 'undefined') {
  window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id);
    };
}

const useDeferredRender = () => {
  const [renderComponent, setRenderComponent] = useState(false);

  useClientSideEffect(() => {
    if (!renderComponent) {
      window.requestIdleCallback(() => setRenderComponent(true), {
        timeout: Math.floor(Math.random() * 7000),
      });
    }
  }, [renderComponent]);

  return renderComponent;
};

export default useDeferredRender;
