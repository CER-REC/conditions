import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import handleInteraction from '../../utilities/handleInteraction';

import ImageDownload from './ImageDownload';
import Modal from '../Modal';

import './styles.scss';

// const ImageDownload = props => (<div><h1>Hello</h1></div>);
const DownloadPopup = (props) => {
  const {
    isOpen,
    closeModal,
  } = props;

  if (!isOpen) { return null; }

  const componentProps = {};

  return (
    <Modal
      className="DownloadPopup"
      component={ImageDownload}
      componentProps={componentProps}
      closeModal={closeModal}
      width="600px"
      height="600px"
      isOpen={isOpen}
    />
  );

  // return <ImageDownload {...componentProps} />;
};

DownloadPopup.propTypes = {
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
};

DownloadPopup.defaultProps = {
  isOpen: false,
};

export default DownloadPopup;
