import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import handleInteraction from '../../utilities/handleInteraction';

import Modal from '../Modal';

import './styles.scss';

// TODO: Split this into a testable component. See the RegDocsPopup for an example.
const DownloadPopup = (props) => {
  const component = ({ closeModal }) => (
    <div className="Download">
      <div className="header">
        <span className="title">
          <FormattedMessage id="components.modal.data.title" />
        </span>
        {/* Didn't use Icon because icon was not supported in our font-awesome library */}
        <svg
          version="1.1"
          width="20"
          height="20"
          className="closeIcon"
          {...handleInteraction(closeModal)}
        >
          <line x1="0" y1="20" x2="20" y2="0" strokeLinecap="round" />
          <line x1="0" y1="0" x2="20" y2="20" strokeLinecap="round" />
        </svg>
      </div>
      <div className="content">
        <FormattedMessage id="components.modal.data.description" />
      </div>
      <div className="footer">
        {!props.modalAction ? null : (
          <button
            className="textButton"
            type="button"
            {...handleInteraction(props.modalAction)}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      component={component}
      isOpen={props.isOpen}
      closeModal={props.closeModal}
      className="DownloadPopup"
    />
  );
};

DownloadPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
  /** Adds a link to the footer of the Modal window that triggers this function */
  // eslint-disable-next-line react/no-unused-prop-types
  modalAction: PropTypes.func,
};

DownloadPopup.defaultProps = {
  modalAction: null,
  isOpen: false,
};

export default DownloadPopup;
