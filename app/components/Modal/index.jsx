import React from 'react';
import PropTypes from 'prop-types';
import handleInteraction from '../../utilities/handleInteraction';

import './styles.scss';

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  toggleOpen = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  render() {
    if (!this.state.isOpen) { return null; }
    const {
      title,
      content,
      modalAction,
      height,
      width,
    } = this.props;

    return (
      <div className="Modal" style={{ height, width }}>
        <div className="header">
          <span className="title">{title}</span>
          {/* Didn't use Icon because iconwas not supported in our font-awesome library */}
          <svg version="1.1" width="20" height="20" className="closeIcon" {...handleInteraction(this.toggleOpen)} tabIndex={0}>
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
      </div>
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
  height: '100%',
  width: '100%',
};

export default Modal;
