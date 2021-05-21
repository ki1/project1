import React from 'react';
import WowModal from '../../WowModal';
import ButtonForm from '../button/CTAButton';
import {
  CONTINUE,
  SUBSCRIBE_CONFIRMATION,
  DEALS_SUBSCRIPTION,
} from '../../../config/text/text';

const ConfirmationModal = ({
  currentRef,
  showConfirmationModal,
  setShowConfirmationModal,
  subscribe,
}) => {
  return (
    <>
      <WowModal
        title={DEALS_SUBSCRIPTION}
        showModal={showConfirmationModal}
        setShowModal={setShowConfirmationModal}
        size="lg"
        container={currentRef}
        ariaLabelledBy="id-subscribe"
        extraClasses="with-header-background with-animation fullscreen-mobile"
        centered={true}
      >
        <div className="confirmation-text-wrapper">
          <span
            className="confirmation-text"
            dangerouslySetInnerHTML={{ __html: SUBSCRIBE_CONFIRMATION }}
          />
        </div>
        <div className="confirmation-button">
          <ButtonForm
            onClick={subscribe}
            className="with-header-background no-3d"
          >
            {CONTINUE.toUpperCase()}
          </ButtonForm>
        </div>
      </WowModal>
      <style jsx>{`
        .confirmation-text {
          margin-bottom: 20px;
          display: inline-block;
        }
        .confirmation-button {
          border-top: 1px solid #ccc;
          padding: 12px;
          min-height: 60px;
          text-align: right;
        }
        .confirmation-text-wrapper {
          padding: 12px;
          display: block;
        }
      `}</style>
    </>
  );
};

export default ConfirmationModal;
