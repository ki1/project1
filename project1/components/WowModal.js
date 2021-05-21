/* WowModal - a wrapper for react bootstrap modal.
  The parent of this component will manage its state.
 */
import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import ThemeContext from '../providers/ThemeProvider';
import PropTypes from 'prop-types';

const WowModal = ({
  showModal,
  setShowModal,
  title,
  children,
  size,
  container,
  ariaLabelledBy,
  extraClasses,
  backdrop,
  backdropClassName,
  centered,
  topPosition,
}) => {
  const theme = useContext(ThemeContext);

  if (!showModal) return null;

  const titleEl = title && (
    <Modal.Title className="example-custom-modal-styling-title">
      {title}
    </Modal.Title>
  );

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby={ariaLabelledBy}
        size={size}
        container={container}
        className={extraClasses}
        backdrop={backdrop}
        backdropClassName={backdropClassName}
        centered={centered}
      >
        <Modal.Header closeButton>{titleEl}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
      <style jsx global>{`
        @media (max-width: ${theme.breakpoints.mdDown}) {
          .header-icon--hidden-mobile.modal {
            display: none !important;
          }
        }
        // defaults
        .modal-open {
          padding-left: 0 !important;
        }
        .modal-open .modal {
          padding-left: 0 !important;
        }

        .modal-content {
          border: none;
          border-radius: 6px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        }

        .modal-header .close {
          font-size: 25px;
          line-height: 20px;
          font-weight: normal;
        }
        .modal-body .deal-main-deal__discount {
          background-color: ${theme.colors.primary};
        }

        // resset animation
        .modal.show .modal-dialog {
          animation: none;
          transition: none;
          transform: none;
        }
        .modal.fade .modal-dialog {
          animation: none;
          transition: none;
          transform: none;
        }
        .modal.modal-static .modal-dialog {
          animation: none;
          transition: none;
          transform: none;
        }

        // genetic styles
        .no-body-padding .modal-body {
          padding: 0;
        }
        .no-rounded-corners .modal-content {
          border-radius: 0;
        }
        .remove-backdrop {
          opacity: 0;
        }
        .remove-header .modal-header {
          display: none;
        }
        .remove-backdrop.show {
          opacity: 0;
        }
        .move-backward.modal {
          z-index: 1040;
        }
        @media (max-width: ${theme.breakpoints.mdUp}) {
          .fullscreen-mobile .modal-dialog {
            width: 100%;
            min-width: 100%;
            min-height: 100%;
            height: 100%;
            top: 0;
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            margin: 0;
          }
        }

        // animation move
        @keyframes mymove {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .with-animation .modal-content {
          animation: mymove 0.8s ease-out forwards;
        }

        // animation fade
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .with-fade-in .modal-content {
          animation: fade-in 0.2s;
        }

        // animation slide in
        @keyframes slide-in {
          0% {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(0vw);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes slide-in {
            0% {
              transform: none;
            }
            100% {
              transform: none;
            }
          }
        }

        @keyframes slide-out {
          100% {
            transform: translateX(-100vw);
          }
          0% {
            transform: translateX(0vw);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes slide-out {
            100% {
              transform: none;
            }
            0% {
              transform: none;
            }
          }
        }

        .with-slide-in.fade .modal-dialog {
          animation: slide-out 0.3s;
        }
        .with-slide-in.show .modal-dialog {
          animation: slide-in 0.3s;
        }

        // burger menu
        @media (max-width: ${theme.breakpoints.mdUp}) {
          .slide-out-menu .modal-dialog {
            width: calc(100vw - (100px));
            height: calc(100vh - (${topPosition + 52}px));
            bottom: 0;
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            margin: 0;
          }
          .is-logged-in.slide-out-menu .modal-dialog {
            // height: calc(100vh - (97px));
          }
          .slide-out-menu .modal-content {
            height: 100%;
            width: 100%;
          }
          .slide-out-menu .modal-body {
            background-color: ${theme.colors.navbackground};
          }
        }

        // headerlogin-menu
        .headerlogin-menu {
          position: absolute;
          top: 10px;
          max-width: 180px;
          height: fit-content;
          -webkit-transform: translateX(5%);
          -ms-transform: translateX(5%);
          transform: translateX(5%);
        }
        .headerlogin-menu .modal-content {
          border: none;
          max-width: 130px;
          text-align: left;
          z-index: 500;

          -webkit-transform: translateX(30%);
          -ms-transform: translateX(30%);
          transform: translateX(30%);
        }
        .headerlogin-menu .modal-body {
          padding: 12px;
        }

        // subscribe confirmation
        .with-header-background button span {
          font-size: 14px;
          color: white;
          top: 0;
          position: relative;
          display: flex;
          font-weight: 100;
        }
        .with-header-background .modal-header {
          background: ${theme.colors.primary};
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          color: #fff;
        }
        .with-header-background .modal-header .modal-title {
          font-weight: 200;
        }
        .with-header-background .modal-content {
          width: 100%;
          height: 100%;
        }
        .with-header-background .modal-body {
          padding: 0;
        }

        // subscribepopup
        .subscribepopup .modal-content {
          background: #fff;
          text-align: left;
          z-index: 500;
        }
        @media (min-width: ${theme.breakpoints.mdUp}) {
          .subscribepopup .modal-content {
            bottom: auto;
            left: 80%;
            margin-top: 40px;
            max-width: 400px;
            -webkit-transform: translateX(-25%);
            -ms-transform: translateX(-25%);
            transform: translateX(-25%);
            width: 100%;
          }
        }
        @media (max-width: ${theme.breakpoints.xlUp}) {
          .subscribepopup .modal-content {
            -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
          }
        }
        @media (max-width: ${theme.breakpoints.lgUp}) {
          .subscribepopup .modal-content {
            -webkit-transform: translateX(-75%);
            -ms-transform: translateX(-75%);
            transform: translateX(-75%);
          }
        }
        @media (max-width: ${theme.breakpoints.mdUp}) {
          .subscribepopup .modal-content {
            -webkit-transform: translateX(0%);
            -ms-transform: translateX(0%);
            transform: translateX(0%);
          }
        }
      `}</style>
    </>
  );
};

export default WowModal;

WowModal.propTypes = {
  size: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  ariaLabelledBy: PropTypes.string.isRequired,
  extraClasses: PropTypes.string,
  backdrop: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  backdropClassName: PropTypes.string,
  centered: PropTypes.bool,
  isMobileHidden: PropTypes.bool,
};

WowModal.defaultProps = {
  size: '',
  title: '',
  extraClasses: '',
  backdrop: true,
  backdropClassName: '',
  centered: false,
  isMobileHidden: false,
};
