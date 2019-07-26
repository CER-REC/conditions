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
    this.dialog = React.createRef();
  }

  componentDidMount() {
    if (this.dialog.current) { dialogPolyfill.registerDialog(this.dialog.current); }
    // Use the inverse as the old state to ensure it updates
    this.updateDialogState(!this.props.isOpen, this.props.isOpen);
  }

  componentDidUpdate(prevProps) {
    this.updateDialogState(prevProps.isOpen, this.props.isOpen);
  }

  componentWillUnmount() {
    this.updateDialogState(this.props.isOpen, false);
  }

  updateDialogState = (wasOpen, isOpen) => {
    if (!this.dialog.current) { return; }
    if (wasOpen === isOpen) { return; }

    if (isOpen) {
      this.lastFocus = document.activeElement;
      this.dialog.current.showModal();
    } else if (this.dialog.current.hasAttribute('open')) {
      this.dialog.current.close();
    }
    // else branch would be trying to close a dialog we thought was open, but
    // had been closed by the dialog itself already (pressing esc)
  };

  dialogClosed = () => {
    // If something was focused before the dialog opened, refocus on it
    if (this.lastFocus) { this.lastFocus.focus(); }
    // If the dialog was closed with esc, notify the parent to close it
    if (this.props.isOpen) { this.props.closeModal(); }
  }

  render() {
    const { isOpen, componentProps } = this.props;

    return (
      <dialog
        className={classNames('Modal', this.props.className)}
        onClose={this.dialogClosed}
        ref={this.dialog}
      >
        <this.props.component
          {...componentProps}
          isOpen={isOpen}
          closeModal={this.props.closeModal}
        />
      </dialog>
    );
  }
}

Modal.propTypes = {
  /** A non-rendered component to be rendered in the window */
  component: componentType.isRequired,
  /** Props to be passed to the component */
  componentProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
