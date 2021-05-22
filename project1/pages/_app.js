/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { wrapper } from '../redux/store/store';
import '../scss/custom.scss';
import 'leaflet/dist/leaflet.css';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ToastProvider } from '../providers/ToastProvider';
import { generateUEID } from '../helpers/generateID';
import useDeferredRender from '../helpers/useDeferredRender';
import { cookieMonsterInit, didomiTokenSetter } from '../helpers/cookieSetter';
import themes from '../config/themes/themes.js';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../redux/actions/locations';
import { setLightbox } from '../redux/actions/users';
import { setPageType } from '../redux/actions/pagetype';
import DidomiSDKBlock from '../components/didomi/DidomiSDKBlock';
import Toast from '../components/_generic/toast/Toast';
import LoadingPlaceholder from '../components/_generic/loading-placeholder/LoadingPlaceholder';
import SubscribeModal from '../components/generic/forms/subscribeModal';
import { useRouter } from 'next/router';

// eslint-disable-next-line sonarjs/cognitive-complexity
const MyApp = ({ Component, pageProps }) => {
  // NEXT_PUBLIC_BRAND has the brand used by default
  const envBrand = themes[process.env.NEXT_PUBLIC_BRAND] || themes.wowcher;
  const [theme, setTheme] = useState(envBrand);
  const [lightbox] = useSelector((state) => [state.user.lightbox]);
  const Layout = Component.layout || HeaderFooterLayout;
  const showDidomi = useDeferredRender();
  const [showSubModal, setShowSubModal] = useState(false);

  const dispatch = useDispatch();
  const [locations, pageType] = useSelector((state) => [
    state.locations.locations,
    state.pagetype.pageType,
  ]);

  const router = useRouter();

  useEffect(() => {
    lightbox && setShowSubModal(true);
  }, [lightbox]);

  useEffect(() => {
    cookieMonsterInit(router.query);
    // didomiTokenSetter();

    if (process.browser) {
      window.setLightbox = (arg) => {
        dispatch(setLightbox(arg));
      };
    }
  }, []);

  const [pageIsLoading, setPageIsLoading] = useState(false);

  useEffect(() => {
    // This is to disable Next.js scrolling to top bug when useServerSideProps is used
    // https://github.com/vercel/next.js/issues/20951#issuecomment-757565850
    router.beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, [router]);

  useEffect(() => {
    const handleStart = (url) => {
      // split of the main path is different to the router path
      if (url.split('?')[0] !== router.asPath.split('?')[0]) {
        setPageIsLoading(true);
      }
    };

    const handleComplete = () => {
      setPageIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    dispatch(getLocation(locations));
  }, [dispatch, locations]);

  const fontsClass = theme.fonts.theme
    ? `${theme.fonts.theme}, ${theme.fonts.base}`
    : `${theme.fonts.base}`;

  const [toasts, setToasts] = useState([]);

  const providerValue = useMemo(() => {
    return {
      addToast: (content, status, position, extraClass) => {
        const id = generateUEID();
        setToasts((queue) => [
          { id, content, status, position, extraClass },
          ...queue,
        ]);
      },
      removeToast: (id) => setToasts(toasts.filter((t) => t.id !== id)),
    };
  }, []);

  const toastPosition =
    toasts[0] && toasts[0].position ? toasts[0].position : 'top-right';

  useEffect(() => {
    dispatch(setPageType(router.asPath, locations));
  }, [dispatch, locations, pageType]);

  return (
    <>
      <ThemeProvider value={theme}>
        <ToastProvider value={providerValue}>
          <Layout {...pageProps} {...Component}>
            {pageIsLoading ? (
              <LoadingPlaceholder />
            ) : (
              <Component {...pageProps} />
            )}
            {process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev' && (
              <ThemeSwitcher
                changeTheme={(themeName) => setTheme(themes[themeName])}
              />
            )}
            {showDidomi && <DidomiSDKBlock />}
            {showSubModal && (
              <SubscribeModal
                showModal={showSubModal}
                setShowModal={setShowSubModal}
                isLightBox={true}
              />
            )}
            <div className={`toast-container ${toastPosition}`}>
              {toasts.map((t) => (
                <Toast
                  key={t.id}
                  status={t.status}
                  position={t.position}
                  extraClass={t.extraClass}
                  remove={() => providerValue.removeToast(t.id)}
                >
                  {t.content}
                </Toast>
              ))}
            </div>
          </Layout>
          <style jsx global>{`
            @font-face {
              font-family: 'Nunito';
              font-style: normal;
              font-weight: 400;
              src: local('Nunito Regular'), local('Nunito-Regular'),
                url('/fonts/nunito-v13-latin-regular.woff2') format('woff2'),
                url('/fonts/nunito-v13-latin-regular.woff') format('woff');
            }
            body {
              background-color: ${theme.colors.background};
              font-family: ${fontsClass};
              font-size: 14px;
              line-height: 1.42857143;
            }
            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0, 0, 0, 0);
              white-space: nowrap;
              border: 0;
            }
          `}</style>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
