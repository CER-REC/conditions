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
    this.updateDialogState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.updateDialogState();
    }
  }

  componentWillUnmount() {
    if (this.dialog.current && this.dialog.current.hasAttribute('open')) { this.dialog.current.close(); }
  }

  updateDialogState = () => {
    if (!this.dialog.current) { return; }

    if (this.props.isOpen) {
      this.lastFocus = document.activeElement;
      this.dialog.current.showModal();
    } else if (this.dialog.current.hasAttribute('open')) {
      this.dialog.current.close();
    }
  };

  dialogClosed = () => { if (this.lastFocus) { this.lastFocus.focus(); } }

  render() {
    const {
      isOpen,
      componentProps,
    } = this.props;

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
