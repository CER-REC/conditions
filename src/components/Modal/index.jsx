import React from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import { componentType } from '../../proptypes';

import 'dialog-polyfill/dialog-polyfill.css';

// import ModalContent from './ModalContent';

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
      height,
      width,
      isOpen,
      componentProps,
    } = this.props;

    if (!isOpen) { return null; }

    return (
      <dialog
        className="Modal"
        style={{ height, width }}
        onClose={this.dialogClosed}
        ref={this.registerDialog}
      >
        <this.props.component
          {...componentProps}
          isOpen={isOpen}
          closeModal={this.close}
        />
      </dialog>
    );
  }
}

Modal.propTypes = {
  // "is a component" check borrowed from React Router:
  // https://github.com/ReactTraining/react-router/blob/6a99c9362d46f768d93bbf9b9bc657ca7ce683be/packages/react-router/modules/Route.js#L82
  /** A component type and its props, to be rendered in the window */
  component: componentType,
  componentProps: PropTypes.shape({}),
  /** Height of modal window (percent or pixel) */
  height: PropTypes.string,
  /** Width of modal window (percent or pixel)  */
  width: PropTypes.string,
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
  height: '100%',
  width: '100%',
  componentProps: {},
};

export default Modal;
