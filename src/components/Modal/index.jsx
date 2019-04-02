import React from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import classNames from 'classnames';
import { componentType } from '../../proptypes';

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
      isOpen,
      componentProps,
    } = this.props;

    if (!isOpen) { return null; }

    return (
      <dialog
        className={classNames('Modal', this.props.className)}
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
  /** A non-rendered component to be rendered in the window */
  component: componentType.isRequired,
  /** Props to be passed to the component */
  componentProps: PropTypes.shape({}),
  /** Determines if the modal is opened or closed */
  isOpen: PropTypes.bool,
  /** Function that closes the modal */
  closeModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Modal.defaultProps = {
  isOpen: false,
  componentProps: {},
  className: '',
};

export default Modal;
