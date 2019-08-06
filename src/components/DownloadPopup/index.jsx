import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { localDataURL, fileDownloadName } from '../../constants';
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
      <div className="content top">
        <FormattedMessage id="components.modal.data.description" />
      </div>
      <div className="Icons">
        <a href={localDataURL} target="_blank" rel="noopener noreferrer">
          <svg className="downloadIcon" viewBox="0 0 12 17" width="250" height="250">
            <g
              key="file-download"
              icon="file-download"
            >
              {/* Arrow */}
              <path fill="#666" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.2c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L6.1,16Z" />
              {/* File outline */}
              <path
                fill="#666"
                d="
              M7.8,1.1
              l2.8,2.9
              v6.8
              H1
              V1.1
              H7.8
              M8.2,0
              H0
              V11.6
              H11.6
              V3.4
              Z"
              />
              {/* Vertical Line */}
              <line stroke="#666" strokeWidth="0.1" x1="7.8" y1="0.4" x2="7.8" y2="4" />
              {/* Horizontal line */}
              <line stroke="#666" strokeWidth="0.1" x1="11.2" y1="4" x2="7.75" y2="4" />
            </g>
          </svg>
        </a>
      </div>
      <div className="content">
        {fileDownloadName}
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
