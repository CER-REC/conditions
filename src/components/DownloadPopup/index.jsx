import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { localDataURL } from '../../constants';
import PopupBtn from '../PopupBtn';

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
      </div>
      <div className="Icons">
        <a href={localDataURL}>
          <svg className="downloadIcon" viewBox="0 0 20 20" width="565" height="350">
            <g
              key="file-download"
              icon="file-download"
            >
              <path fill="#666" d="M2.9,13.3s-.4-.3,0-.3H4.5V9.2c0-.1.1-.2.3-.2H7c.1,0,.2.1.3.2v3.7H8.8c.5,0,.2.3.2.3L6.1,16Z" />
              <polygon fill="none" points="0 0 0 11.6 3.4 11.6 3.4 6.7 8.3 6.7 8.3 11.6 11.6 11.6 11.6 0 0 0" />
              <line strokeMiterlimit="10" x1="0.5" y1="11.1" x2="11.2" y2="11.1" />
              <rect fill="none" width="11.6" height="11.6" />
              <path fill="#666" d="M7.8,1l2.8,2.9v6.8H1V1.1H7.8M8.2,0H0V11.6H11.6V3.4L8.2,0Z" />
              <line stroke="#666" strokeWidth="0.75p" x1="7.7" y1="0.4" x2="7.7" y2="4" />
              <line stroke="#666" strokeWidth="0.75px" x1="11.2" y1="4" x2="7.3" y2="4" />
            </g>
          </svg>
        </a>
      </div>

      <div className="content">
        <FormattedMessage id="components.modal.data.description" />
      </div>
      <div className="closeIcon">
        <FormattedMessage id="components.modal.company.back">
          {text => <PopupBtn text={text} icon="x" action={closeModal} />}
        </FormattedMessage>
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
