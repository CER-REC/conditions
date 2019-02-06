import React from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import 'dialog-polyfill/dialog-polyfill.css';

import ModalContent from './ModalContent';

import './styles.scss';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.lastFocus = null;
  }

  /* Polyfill prevents testing (must be manually tested) */
  registerDialog = (ref) => {
    this.dialog = ref;
    if (ref === null) { return; }

    this.lastFocus = document.activeElement;
    dialogPolyfill.registerDialog(ref);
    ref.showModal();
  }

  /* Polyfill prevents testing (must be manually tested) */
  dialogClosed = () => { if (this.lastFocus) { this.lastFocus.focus(); } }

  /* Polyfill prevents testing (must be manually tested) */
  close = () => {
    this.props.closeModal();
    if (this.dialog) { this.dialog.close(); }
  }

  render() {
    const {
      type,
      content,
      modalAction,
      height,
      width,
      isOpen,
    } = this.props;

    if (!isOpen) { return null; }

    return (
      <dialog
        className="Modal"
        style={{ height, width }}
        onClose={this.dialogClosed}
        ref={this.registerDialog}
      >
        <ModalContent
          type={type}
          content={content}
          modalAction={modalAction}
          isOpen={isOpen}
          closeModal={this.close}
        />
      </dialog>
    );
  }
}

Modal.propTypes = {
  /** The type of modal (used to look up text for language) */
  type: PropTypes.string.isRequired,
  /** The element to be rendered in the center of the modal */
  content: PropTypes.node.isRequired,
  /** Height of modal window (percent or pixel) */
  height: PropTypes.string,
  /** Width of modal window (percent or pixel)  */
  width: PropTypes.string,
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
  /** Adds a link to the footer of the Modal window that triggers this function */
  modalAction: PropTypes.func,
};

Modal.defaultProps = {
  modalAction: null,
  isOpen: false,
  height: '100%',
  width: '100%',
};

export default Modal;
