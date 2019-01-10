import React from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import handleInteraction from '../../utilities/handleInteraction';
import 'dialog-polyfill/dialog-polyfill.css';

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
      title,
      content,
      modalAction,
      height,
      width,
      isOpen,
    } = this.props;

    if (!isOpen) { return null; }

    return (
      <dialog className="Modal" style={{ height, width }} onClose={this.dialogClosed} ref={this.registerDialog}>
        <div className="header">
          <span className="title">{title}</span>
          {/* Didn't use Icon because icon was not supported in our font-awesome library */}
          <svg version="1.1" width="20" height="20" className="closeIcon" {...handleInteraction(this.close)} tabIndex={0}>
            <line x1="0" y1="20" x2="20" y2="0" strokeLinecap="round" />
            <line x1="0" y1="0" x2="20" y2="20" strokeLinecap="round" />
          </svg>
        </div>
        <div className="content">
          {content}
        </div>
        <div className="footer">
          {modalAction
            ? (<button className="textButton" type="button" {...handleInteraction(modalAction.task)}>{modalAction.text}</button>)
            : null
          }
        </div>
      </dialog>
    );
  }
}

Modal.propTypes = {
  /** The title of the Modal window */
  title: PropTypes.string.isRequired,
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
  /** Adds a link to the footer of the Modal window */
  modalAction: PropTypes.shape({
    /** The copy for the Modals footer link */
    text: PropTypes.string.isRequired,
    /** The function to handle after interacted with */
    task: PropTypes.func.isRequired,
  }),
};

Modal.defaultProps = {
  modalAction: null,
  isOpen: false,
  height: '100%',
  width: '100%',
};

export default Modal;
